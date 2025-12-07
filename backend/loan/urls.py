
from django.urls import path
from .views import *

urlpatterns = [
    path("loan-signup/", LoanSignupView.as_view(), name="loan-signup"),
    path("Loan-phone-check/", PhoneCheckView.as_view(), name="phone-check"),
    path("loan-login/", LoanLoginView.as_view(), name="loan-login"),
    path("member-update/<str:custom_id>/", MemberUpdateView.as_view()),
    path("check-membership-filled/", CheckApplicationStatusView.as_view(), name="Status"),
    path("apply-loan/", ApplyLoanView.as_view(), name="apply-loan"),
]