from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import cloudinary
import cloudinary.uploader
import math
from bson.objectid import ObjectId
from bson.errors import InvalidId
from django.contrib.auth.hashers import make_password, check_password




from .db import db   # yaha db import ho raha hai
students_collection = db["students"]
events_collection = db["events"]        # ⬅️  ye line add karo
attendance_collection = db["attendance"]
coordinators_collection = db["coordinators"]
directors_collection     = db["directors"]        
final_reports_collection = db["final_reports"]   


DIRECTOR_SECRET_CODE = "TECHTHRIVE-DIR-2025"






@api_view(['GET'])
def test_db(request):
    # temporary test data insert
    db.test.insert_one({"msg": "MongoDB Connected!"})
    return Response({"status": "MongoDB working"})

@api_view(['GET'])
def test_cloudinary(request):
    # sirf config check kar rahe hain
    return Response({"status": "Cloudinary config ok"})

@csrf_exempt
def register_student(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    # 1. Form se data lo
    name = request.POST.get("name")
    email = request.POST.get("email")
    phone = request.POST.get("phone")
    event = request.POST.get("event")
    event_date = request.POST.get("event_date")
    image = request.FILES.get("image")

    if not image:
        return JsonResponse({"error": "Image is required"}, status=400)

    # 2. Image Cloudinary pe upload
    try:
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result.get("secure_url")
    except Exception as e:
        return JsonResponse({"error": f"Cloudinary error: {str(e)}"}, status=500)

    # 3. MongoDB me data save
    student_doc = {
        "name": name,
        "email": email,
        "phone": phone,
        "event": event,
        "event_date": event_date,
        "image_url": image_url,
    }

    db.students.insert_one(student_doc)

    # 4. Response bhejo
    return JsonResponse({"message": "Student registered successfully!"})
@csrf_exempt
def create_event(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    # 1. Form se values lo
    name = request.POST.get("name")
    description = request.POST.get("description", "")
    event_date = request.POST.get("event_date")     # "2025-12-05"
    start_time = request.POST.get("start_time")     # "14:00"
    end_time = request.POST.get("end_time")         # "16:00"
    location_lat = request.POST.get("location_lat")
    location_lng = request.POST.get("location_lng")
    location_radius_m = request.POST.get("location_radius_m", "100")
    created_by = request.POST.get("created_by", "")

    # 2. Required fields check
    if not name or not event_date or not start_time or not end_time \
       or not location_lat or not location_lng:
        return JsonResponse(
            {"error": "name, event_date, start_time, end_time, location_lat, location_lng required"},
            status=400
        )

    # 3. Number convert (float)
    try:
        location_lat = float(location_lat)
        location_lng = float(location_lng)
        location_radius_m = float(location_radius_m)
    except ValueError:
        return JsonResponse({"error": "Invalid location values"}, status=400)

    # 4. MongoDB me document banaao
    event_doc = {
        "name": name,
        "description": description,
        "event_date": event_date,
        "start_time": start_time,
        "end_time": end_time,
        "location_lat": location_lat,
        "location_lng": location_lng,
        "location_radius_m": location_radius_m,
        "created_by": created_by,
        "created_at": datetime.utcnow()
    }

    result = db.events.insert_one(event_doc)

    # 5. Response
    return JsonResponse({
        "message": "Event created successfully",
        "event_id": str(result.inserted_id)
    })
@api_view(["POST"])
def submit_attendance(request):
    data = request.data

    # 1. Form se values uthao
    student_id = data.get("student_id")
    event_id = data.get("event_id")
    course = data.get("course")
    branch = data.get("branch")
    year = data.get("year")
    q_id = data.get("q_id")
    subjects_text = data.get("subjects", "")  # e.g. "AI, ML"
    lecture_time = data.get("lecture_time")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    # Basic validation
    if not (student_id and event_id and latitude and longitude):
        return JsonResponse(
            {"error": "student_id, event_id, latitude, longitude required"},
            status=400,
        )

    # Subjects ko list me convert karo
    subjects = [s.strip() for s in subjects_text.split(",") if s.strip()]
    event = None
    raw_event_id = str(event_id).strip()
    try:
        obj_id = ObjectId(raw_event_id)
        event = events_collection.find_one({"_id": obj_id})
    except InvalidId:
        event = None
    except Exception as e:
        return JsonResponse({"error": f"Mongo error while finding event: {str(e)}"}, status=500)
    if not event:
        event = events_collection.find_one({"name": raw_event_id})

    if not event:
        return JsonResponse(
            {
                "error": "Event not found",
                "debug_event_id_received": raw_event_id
            },
            status=404
        )

    # 2. Event details lao (location verify ke liye)
    

    try:
        user_lat = float(latitude)
        user_lng = float(longitude)
        event_lat = float(event["location_lat"])
        event_lng = float(event["location_lng"])
        radius_m = float(event["location_radius_m"])
    except Exception:
        return JsonResponse({"error": "Invalid location data"}, status=400)

    # 3. Distance calculate (Haversine formula – approx)
    R = 6371000  # earth radius (meters)

    d_lat = math.radians(user_lat - event_lat)
    d_lng = math.radians(user_lng - event_lng)

    a = (math.sin(d_lat / 2) ** 2) + math.cos(math.radians(event_lat)) * \
        math.cos(math.radians(user_lat)) * (math.sin(d_lng / 2) ** 2)

    distance = 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    location_verified = distance <= radius_m

    # 4. Attendance document banao
    attendance_doc = {
        "student_id": student_id,
        "event_id": event_id,
        "course": course,
        "branch": branch,
        "year": year,
        "q_id": q_id,
        "subjects": subjects,
        "lecture_time": lecture_time,
        "face_verified": False,          # abhi ML baad me ayega
        "location_verified": location_verified,
        "match_score": None,             # face match score later
        "status": "pending",             # coordinator approve/reject karega
        "submitted_at": datetime.now(),
        "distance_from_event_m": distance,
    }

    attendance_collection.insert_one(attendance_doc)

    return JsonResponse(
        {
            "message": "Attendance submitted successfully",
            "location_verified": location_verified,
            "distance_m": round(distance, 2),
        },
        status=200,
    )

@api_view(["POST"])
def coordinator_register(request):
    """
    Coordinator Registration:
    Body fields (form-data ya JSON):
    - full_name
    - email
    - department
    - employee_id
    - password
    - id_proof (file)
    """
    data = request.data

    full_name   = data.get("full_name")
    email       = data.get("email")
    department  = data.get("department")
    employee_id = data.get("employee_id")
    password    = data.get("password")
    id_proof    = request.FILES.get("id_proof")

    # 1️⃣ Required fields check
    if not (full_name and email and department and employee_id and password and id_proof):
        return JsonResponse(
            {"error": "full_name, email, department, employee_id, password, id_proof required"},
            status=400
        )

    # 2️⃣ Duplicate email check
    if coordinators_collection.find_one({"email": email}):
        return JsonResponse({"error": "Email already registered"}, status=400)

    # 3️⃣ ID proof Cloudinary pe upload
    try:
        upload_result = cloudinary.uploader.upload(id_proof)
        id_proof_url = upload_result.get("secure_url")
    except Exception as e:
        return JsonResponse({"error": f"Cloudinary error: {str(e)}"}, status=500)

    # 4️⃣ Password hash
    password_hash = make_password(password)

    # 5️⃣ MongoDB me save
    doc = {
        "full_name": full_name,
        "email": email,
        "department": department,
        "employee_id": employee_id,
        "password_hash": password_hash,
        "id_proof_url": id_proof_url,
        "is_active": True,
        "created_at": datetime.utcnow(),
    }

    result = coordinators_collection.insert_one(doc)

    return JsonResponse(
        {
            "message": "Coordinator registered successfully",
            "coordinator_id": str(result.inserted_id),
        },
        status=201,
    )

@api_view(["POST"])
def coordinator_login(request):
    """
    Coordinator Login:
    Body fields:
    - email
    - password
    """
    data = request.data

    email = data.get("email")
    password = data.get("password")

    # 1️⃣ Required fields check
    if not (email and password):
        return JsonResponse({"error": "email and password required"}, status=400)

    # 2️⃣ Email se user dhoondo
    user = coordinators_collection.find_one({"email": email})
    if not user:
        return JsonResponse({"error": "Invalid email or password"}, status=401)

    # 3️⃣ Password verify
    if not check_password(password, user.get("password_hash", "")):
        return JsonResponse({"error": "Invalid email or password"}, status=401)

    # 4️⃣ Success response
    return JsonResponse(
        {
            "message": "Login successful",
            "coordinator": {
                "id": str(user["_id"]),
                "full_name": user.get("full_name"),
                "email": user.get("email"),
                "department": user.get("department"),
                "employee_id": user.get("employee_id"),
            }
        },
        status=200,
    )
@api_view(["GET"])
def coordinator_dashboard_summary(request):
    """
    Top cards summary for coordinator dashboard
    """
    # Pending = status "pending"
    pending_count = attendance_collection.count_documents({"status": "pending"})

    # Approved today = status "approved" and decided today
    today_str = datetime.utcnow().date().isoformat()
    approved_today = attendance_collection.count_documents({
        "status": "approved",
        "decided_at_date": today_str
    })

    # Suspicious = rejected and location_verified == False
    suspicious_attempts = attendance_collection.count_documents({
        "status": "rejected",
        "location_verified": False
    })

    # Optional extra info
    total_students = students_collection.count_documents({})
    total_events = events_collection.count_documents({})

    return JsonResponse(
        {
            "pending_requests": pending_count,
            "approved_today": approved_today,
            "suspicious_attempts": suspicious_attempts,
            "total_students": total_students,
            "total_events": total_events,
        },
        status=200,
    )
@api_view(["GET"])
def coordinator_pending_attendance(request):
    """
    Pending attendance list for table
    """
    # Future me yaha query params se event_id / coordinator filter bhi kar sakte hain
    cursor = attendance_collection.find({"status": "pending"}).sort("submitted_at", -1).limit(50)

    pending_list = []

    for att in cursor:
        # Student fetch
        student = None
        sid = att.get("student_id")
        if sid:
            try:
                student = students_collection.find_one({"_id": ObjectId(sid)})
            except (InvalidId, TypeError):
                student = None

        # Event fetch
        event = None
        eid = att.get("event_id")
        if eid:
            try:
                event = events_collection.find_one({"_id": ObjectId(eid)})
            except (InvalidId, TypeError):
                event = None

        pending_list.append({
            "attendance_id": str(att["_id"]),
            "student": {
                "id": sid,
                "name": student.get("name") if student else None,
                "email": student.get("email") if student else None,
                "image_url": student.get("image_url") if student else None,
                "q_id": att.get("q_id"),
                "course": att.get("course"),
                "branch": att.get("branch"),
                "year": att.get("year"),
            },
            "event": {
                "id": eid,
                "name": event.get("name") if event else None,
                "date": event.get("event_date") if event else None,
                "start_time": event.get("start_time") if event else None,
                "end_time": event.get("end_time") if event else None,
            },
            "subjects": att.get("subjects", []),
            "lecture_time": att.get("lecture_time"),
            "location_verified": att.get("location_verified"),
            "face_verified": att.get("face_verified"),
            "match_score": att.get("match_score"),
            "submitted_at": att.get("submitted_at").isoformat() if att.get("submitted_at") else None,
        })

    return JsonResponse({"pending": pending_list}, status=200)

@api_view(["POST"])
def simple_attendance_action(request):
    """
    VERY SIMPLE: Sirf attendance ko approve ya reject karta hai.
    Body:
    - attendance_id  (string, from pending-attendance API)
    - action         ("approve" ya "reject")
    """
    data = request.data

    attendance_id = str(data.get("attendance_id", "")).strip()
    action = str(data.get("action", "")).strip().lower()

    # 1️⃣ Basic check
    if action not in ["approve", "reject"]:
        return JsonResponse(
            {"error": "action must be 'approve' or 'reject'"},
            status=400
        )

    if not attendance_id:
        return JsonResponse(
            {"error": "attendance_id required"},
            status=400
        )

    # 2️⃣ String ko ObjectId me convert karo
    try:
        att_obj_id = ObjectId(attendance_id)
    except InvalidId as e:
        return JsonResponse(
            {
                "error": "Invalid attendance_id",
                "debug_id": attendance_id,
                "exception": str(e),
            },
            status=400
        )

    # 3️⃣ DB me update karo
    result = attendance_collection.update_one(
        {"_id": att_obj_id},
        {"$set": {"status": "approved" if action == "approve" else "rejected"}}
    )

    if result.matched_count == 0:
        return JsonResponse(
            {"error": "Attendance not found", "debug_id": attendance_id},
            status=404
        )

    return JsonResponse(
        {
            "message": f"Attendance {action}d successfully",
            "new_status": "approved" if action == "approve" else "rejected"
        },
        status=200
    )
@api_view(["GET"])
def coordinator_approved_attendance(request):
    """
    Right side Approved List panel ke liye:
    Recent approved attendance list
    """
    cursor = attendance_collection.find(
        {"status": "approved"}
    ).sort("decided_at", -1).limit(50)

    approved_list = []

    for att in cursor:
        # Student details
        student = None
        sid = att.get("student_id")
        if sid:
            try:
                student = students_collection.find_one({"_id": ObjectId(sid)})
            except (InvalidId, TypeError):
                student = None

        # Event details
        event = None
        eid = att.get("event_id")
        if eid:
            try:
                event = events_collection.find_one({"_id": ObjectId(eid)})
            except (InvalidId, TypeError):
                event = None

        approved_list.append({
            "attendance_id": str(att["_id"]),
            "student_name": student.get("name") if student else None,
            "student_email": student.get("email") if student else None,
            "image_url": student.get("image_url") if student else None,
            "q_id": att.get("q_id"),
            "course": att.get("course"),
            "branch": att.get("branch"),
            "year": att.get("year"),
            "event_name": event.get("name") if event else None,
            "event_date": event.get("event_date") if event else None,
            "decided_at": att.get("decided_at").isoformat() if att.get("decided_at") else None,
        })

    return JsonResponse({"approved": approved_list}, status=200)

@api_view(["POST"])
def director_register(request):
    """
    Director Registration:
    Body (form-data ya JSON):
    - full_name
    - email
    - phone
    - password
    - secret_code
    """
    data = request.data

    full_name   = data.get("full_name")
    email       = data.get("email")
    phone       = data.get("phone")
    password    = data.get("password")
    secret_code = data.get("secret_code")

    # 1️⃣ Required fields check
    if not (full_name and email and phone and password and secret_code):
        return JsonResponse(
            {"error": "full_name, email, phone, password, secret_code required"},
            status=400
        )

    # 2️⃣ Secret access code verify
    if secret_code != DIRECTOR_SECRET_CODE:
        return JsonResponse(
            {"error": "Invalid secret access code"},
            status=403
        )

    # 3️⃣ Email already exists?
    if directors_collection.find_one({"email": email}):
        return JsonResponse(
            {"error": "Director with this email already exists"},
            status=400
        )

    # 4️⃣ Password hash banao
    password_hash = make_password(password)

    # 5️⃣ MongoDB me save karo
    doc = {
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "password_hash": password_hash,
        "is_active": True,
        "role": "director",
        "created_at": datetime.utcnow(),
    }

    result = directors_collection.insert_one(doc)

    return JsonResponse(
        {
            "message": "Director account activated successfully",
            "director_id": str(result.inserted_id),
        },
        status=201
    )








