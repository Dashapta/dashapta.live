from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import Member,LoanApplication
from .serializers import MemberSignupSerializer,MemberSerializer,LoanApplicationSerializer
from django.contrib.auth.hashers import check_password
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import get_object_or_404 
from authentication.models import PaymentInfo

class LoanSignupView(APIView):
    def post(self, request):
        serializer = MemberSignupSerializer(data=request.data)
        if serializer.is_valid():
            referral_custom_id = serializer.validated_data.pop('referral_id', None)
            reference_payment_info = None

            if referral_custom_id:
                try:
                    # Fetch the PaymentInfo using custom_id
                    reference_payment_info = PaymentInfo.objects.get(custom_id=referral_custom_id)
                except PaymentInfo.DoesNotExist:
                    reference_payment_info = None  # or handle error gracefully

            member = Member.objects.create(
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'],
                phone=serializer.validated_data['phone'],
                password=make_password(serializer.validated_data['password']),
                reference=reference_payment_info  # saves actual FK id internally
            )

            return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhoneCheckView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        exists = Member.objects.filter(phone=phone).exists()
        return Response({"exists": exists})


@method_decorator(csrf_exempt, name='dispatch')
class LoanLoginView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            phone = data.get("phone")
            password = data.get("password")

            if not phone or not password:
                return JsonResponse({"detail": "Phone and password are required."}, status=400)

            try:
                member = Member.objects.get(phone=phone)
            except Member.DoesNotExist:
                return JsonResponse({"detail": "Invalid phone number or password."}, status=401)

            if not check_password(password, member.password):
                return JsonResponse({"detail": "Invalid phone number or password."}, status=401)

            return JsonResponse({
                "custom_id": member.custom_id,
                "first_name": member.first_name,
                "last_name": member.last_name,
                "phone": member.phone
            })

        except json.JSONDecodeError:
            return JsonResponse({"detail": "Invalid JSON."}, status=400)

class MemberUpdateView(APIView):
    def put(self, request, custom_id):
        member = get_object_or_404(Member, custom_id=custom_id)
        serializer = MemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class CheckApplicationStatusView(APIView):
    def post(self, request):
        uuid = request.data.get("uuid")

        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            member = Member.objects.get(custom_id=uuid)

            required_fields = [
                member.first_name,
                member.last_name,
                member.phone,
                member.password,

                # Optional Membership Fields (should be filled to consider complete)
                member.occupation,
                member.application_date,
                member.membership_type,
                member.full_name,
                member.place_of_birth,
                member.date_of_birth,
                member.full_address,
                member.status,
                member.nationality,
                member.postcode,
                member.religion,
                member.city,
                member.email,
                member.gender,
                member.driving_license,
                member.signature_photo,
                member.payment_screenshot,
                member.utr_transaction_id,
            ]

            is_complete = all(required_fields)

            return Response({"complete": is_complete}, status=status.HTTP_200_OK)

        except Member.DoesNotExist:
            return Response({"error": "Member not found"}, status=status.HTTP_404_NOT_FOUND)
        


class ApplyLoanView(APIView):
    def post(self, request, *args, **kwargs):
        member_custom_id = request.data.get('memberId')
        try:
            member = Member.objects.get(custom_id=member_custom_id)
        except Member.DoesNotExist:
            return Response({"error": "Invalid membership ID"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Check if loan already exists for this member
        if LoanApplication.objects.filter(member=member).exists():
            return Response(
                {"error": "Loan application already submitted for this member."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Combine data and files
        data = request.data.copy()
        data['member'] = member.id

        serializer = LoanApplicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Loan application submitted"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)