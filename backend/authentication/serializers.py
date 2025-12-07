from rest_framework import serializers
from .models import PaymentInfo
# serializers.py
from django.contrib.auth.hashers import make_password
from scholarship.models import Scholarship


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentInfo
        fields = '__all__'

    def validate_phone_number(self, value):
        if PaymentInfo.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Phone number already exists")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

#Earnings table serializers

class ReferredStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ['uuid', 'first_name', 'last_name']

class ReferredAgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentInfo
        fields = ['custom_id', 'first_name', 'last_name','application_fees']

class AgentDashboardSerializer(serializers.ModelSerializer):
    referred_students = ReferredStudentSerializer(many=True, source='students')
    referred_agents = ReferredAgentSerializer(many=True, source='referred_users')

    class Meta:
        model = PaymentInfo
        fields = ['custom_id', 'first_name', 'last_name', 'referred_students', 'referred_agents']