from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Scholarship,SupportQuery
from .serializers import ScholarshipSerializer,SupportQuerySerializer
from rest_framework import status, parsers
from rest_framework.generics import get_object_or_404
from django.contrib.auth.hashers import make_password

class AadhaarCheckView(APIView):
    def get(self, request, *args, **kwargs):
        aadhaar_number = request.query_params.get("aadhaar")
        # print("changes bro",aadhaar_number)
        if not aadhaar_number:
            return Response({"error": "Aadhaar number required"}, status=status.HTTP_400_BAD_REQUEST)

        exists = Scholarship.objects.filter(aadhar_card_number=aadhaar_number).exists()
        if exists:
            return Response({"exists": True}, status=status.HTTP_200_OK)
        return Response({"exists": False}, status=status.HTTP_200_OK)




class ScholarshipUpdateView(APIView):
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def put(self, request, uuid):
        instance = get_object_or_404(Scholarship, uuid=uuid)

        serializer = ScholarshipSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)




class ForgotPasswordView(APIView):
    def put(self, request):
        phone_number = request.data.get("phone_number")
        uuid = request.data.get("uuid")
        new_password = request.data.get("password")

        if not phone_number or not new_password or not uuid:
            return Response({"detail": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Scholarship.objects.get(phone_number=phone_number, uuid=uuid)
            student.password = make_password(new_password)
            student.save()
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)
        except Scholarship.DoesNotExist:
            return Response({"detail": "Invalid Student ID or Phone number."}, status=status.HTTP_404_NOT_FOUND)


class CheckApplicationStatusView(APIView):
    def post(self, request):
        uuid = request.data.get("uuid")
        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Scholarship.objects.get(uuid=uuid)

            required_fields = [
                student.aadhar_card_number,
                student.aadhar_photo,
                student.first_name,
                student.last_name,
                student.phone_number,
                student.password,
                student.parent_name,
                student.parent_phone_number,
                student.permanent_address,
                student.district,
                student.taluk,
                student.board_of_education,
                student.present_class,
                student.marks_obtained,
                student.college_name,
                student.student_photo,
                student.study_certificate_photo,
                student.payment_screenshot,
                student.utr_transaction_id,
                student.account_holder_name,
                student.account_number,
                student.ifsc_code,
                student.passbook_photo,
            ]

            is_complete = all(required_fields)

            return Response({"complete": is_complete}, status=status.HTTP_200_OK)

        except Scholarship.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)



class SubmitSupportQuery(APIView):
    def post(self, request):
        uuid = request.data.get("uuid")
        
        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not Scholarship.objects.filter(uuid=uuid).exists():
            return Response({"error": "Invalid UUID. Student not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SupportQuerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Query submitted successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
