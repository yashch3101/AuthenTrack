"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home.views import index
from .views import test_db , test_cloudinary , register_student , create_event , submit_attendance , coordinator_register , coordinator_login , coordinator_dashboard_summary, coordinator_pending_attendance , simple_attendance_action , coordinator_approved_attendance ,  director_register
 

urlpatterns = [
    path('admin/', admin.site.urls),
     path('', index), 
     path("api/test-db/", test_db),
     path('api/test-cloud/', test_cloudinary, name='test-cloud'),
     path('api/register/', register_student, name='register-student'),
      path('api/create-event/', create_event, name='create-event'),
      path("api/submit-attendance/", submit_attendance, name="submit-attendance"), 
     path("api/coordinator/register/",coordinator_register, name="coordinator-register"),
      path("api/coordinator/login/", coordinator_login, name="coordinator-login"),
      path("api/coordinator/dashboard-summary/", coordinator_dashboard_summary, name="coordinator-dashboard-summary"),
    path("api/coordinator/pending-attendance/", coordinator_pending_attendance, name="coordinator-pending-attendance"),
    path("api/attendance/action-simple/", simple_attendance_action, name="attendance-action-simple"), 
    path("api/coordinator/approved-attendance/", coordinator_approved_attendance, name="coordinator-approved-attendance"),
        path("api/director/register/", director_register, name="director-register"),

]
