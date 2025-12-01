import pymongo

# yahan tum local MongoDB use kar rahi ho
client = pymongo.MongoClient("mongodb://localhost:27017/")

# database name
db = client["event_attendance"]
