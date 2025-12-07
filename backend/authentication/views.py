from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserProfileSerializer,ReferredStudentSerializer, ReferredAgentSerializer
from scholarship.serializers import ScholarshipSerializer
from .models import PaymentInfo
from scholarship.models import Scholarship
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password

class SignupPaymentAPIView(APIView):
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PaymentLoginAPIView(APIView):
    def post(self, request):
        
        phone = request.data.get("phone")
        password = request.data.get("password")

        if not phone or not password:
            return Response(
                {"error": "Phone number and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = PaymentInfo.objects.get(phone_number=phone)
        except PaymentInfo.DoesNotExist:
            return Response({"error": "Invalid phone number or password"}, status=status.HTTP_401_UNAUTHORIZED)

        if not check_password(password, user.password):
            return Response({"error": "Invalid phone number or password"}, status=status.HTTP_401_UNAUTHORIZED)

        # ✅ Respond with user data (do NOT include raw password)
        return Response({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "custom_id": user.custom_id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone_number": user.phone_number,
            }
        }, status=status.HTTP_200_OK)

# Agent reset password
class AgentPasswordResetView(APIView):
    def put(self, request):
        phone_number = request.data.get("phone_number")
        uuid = request.data.get("uuid")  # Agent ID
        new_password = request.data.get("password")

        if not phone_number or not new_password or not uuid:
            return Response({"error": "Phone number, Agent ID, and new password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            agent = PaymentInfo.objects.get(phone_number=phone_number, custom_id=uuid)
            agent.password = make_password(new_password)
            agent.save()
            return Response({"success": True, "message": "Password updated successfully."}, status=status.HTTP_200_OK)

        except PaymentInfo.DoesNotExist:
            return Response({"error": "Invalid Agent ID or Phone number."}, status=status.HTTP_404_NOT_FOUND)
class CheckPhoneNumberAPIView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        if PaymentInfo.objects.filter(phone_number=phone).exists():
            return Response({"exists": True}, status=status.HTTP_200_OK)
        return Response({"exists": False}, status=status.HTTP_200_OK)
    

class StudentSignupView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ScholarshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Signup successful!", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CheckPhoneView(APIView):
    def post(self, request):
        phone = request.data.get('phone_number')
        if not phone:
            return Response({'error': 'Phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)

        exists = Scholarship.objects.filter(phone_number=phone).exists()
        return Response({'exists': exists})
    
class GetAgentIDView(APIView):
    def post(self, request):
        custom_id = request.data.get("custom_id")
        try:
            agent = PaymentInfo.objects.get(custom_id=custom_id)
            return Response({"agentid": agent.id})
        except PaymentInfo.DoesNotExist:
            return Response({"error": "Agent not found"}, status=404)
        

class StudentLoginView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        password = request.data.get("password")

        if not phone or not password:
            return Response({"detail": "Phone and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Scholarship.objects.get(phone_number=phone)
        except Scholarship.DoesNotExist:
            return Response({"detail": "Invalid phone number or password."}, status=status.HTTP_401_UNAUTHORIZED)

        if not check_password(password, student.password):
            return Response({"detail": "Invalid phone number or password."}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "uuid": student.uuid,
            "first_name": student.first_name,
            "last_name": student.last_name,
            "phone_number": student.phone_number,
        }, status=status.HTTP_200_OK)
    
#earnings    
class AgentEarningsDashboardView(APIView):
    def get(self, request, agent_id):
        try:
            agent = PaymentInfo.objects.get(custom_id=agent_id)
        except PaymentInfo.DoesNotExist:
            return Response({"error": "Agent not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get only students where all required fields are filled
        referred_students = Scholarship.objects.filter(
            agentid=agent.id,
            aadhar_card_number__isnull=False,
            aadhar_photo__isnull=False,
            first_name__isnull=False,
            last_name__isnull=False,
            phone_number__isnull=False,
            password__isnull=False,
            parent_name__isnull=False,
            parent_phone_number__isnull=False,
            permanent_address__isnull=False,
            district__isnull=False,
            taluk__isnull=False,
            board_of_education__isnull=False,
            present_class__isnull=False,
            marks_obtained__isnull=False,
            college_name__isnull=False,
            student_photo__isnull=False,
            study_certificate_photo__isnull=False,
            payment_screenshot__isnull=False,
            utr_transaction_id__isnull=False,
            account_holder_name__isnull=False,
            account_number__isnull=False,
            ifsc_code__isnull=False,
            passbook_photo__isnull=False,
        )

        # Get only agents referred by this agent with all required fields filled
        referred_agents = PaymentInfo.objects.filter(
            agentid=agent.id,
            first_name__isnull=False,
            last_name__isnull=False,
            phone_number__isnull=False,
            password__isnull=False,
            account_holder_name__isnull=False,
            utr_id__isnull=False,
            payment_screenshot__isnull=False,
            application_fees__isnull=False,
        )

        # Build response
        response = {
            "custom_id": agent.custom_id,
            "first_name": agent.first_name,
            "last_name": agent.last_name,
            "referred_students": ReferredStudentSerializer(referred_students, many=True).data,
            "referred_agents": ReferredAgentSerializer(referred_agents, many=True).data,
        }

        return Response(response)