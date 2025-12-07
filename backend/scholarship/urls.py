from django.urls import path
from .views import *

urlpatterns = [
    path("check-aadhaar/", AadhaarCheckView.as_view(), name="check-aadhaar"),
    path("scholarship/<str:uuid>/", ScholarshipUpdateView.as_view(), name="scholarship-create"),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
     path("check-application-status/", CheckApplicationStatusView.as_view()),
     path("submit-query/", SubmitSupportQuery.as_view(), name="submit-query"),
   
]