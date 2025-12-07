from django.urls import path
from .views import *

urlpatterns = [
    path("payment-info/", SignupPaymentAPIView.as_view(), name="payment-info"),
    path('login/', PaymentLoginAPIView.as_view(), name='payment-login'),
    path('phone-check/', CheckPhoneNumberAPIView.as_view(), name='phone-check'),
    path('agent-reset-password/', AgentPasswordResetView.as_view(), name='agent-reset-password'),

    path("agent-earnings/<str:agent_id>/", AgentEarningsDashboardView.as_view(), name="agent-earnings"),

    path('student-signup/', StudentSignupView.as_view(), name='student-signup'),
    path('student-phoneCheck/', CheckPhoneView.as_view(), name='student-phoneCheck'),
    path("get-agent-id/", GetAgentIDView.as_view()),
    path("student-login/", StudentLoginView.as_view(), name="student-login"),

]