from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Scholarship

class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = '__all__'
        read_only_fields = ['uuid']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make all fields optional to support partial creation
        for field in self.fields.values():
            field.required = False
            field.allow_null = True

    def create(self, validated_data):
        # Hash password if provided
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            new_password = validated_data['password']
            if not new_password.startswith('pbkdf2_'):
                validated_data['password'] = make_password(new_password)
        return super().update(instance, validated_data)

from rest_framework import serializers
from .models import SupportQuery

class SupportQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportQuery
        fields = ['uuid', 'query_text', 'created_at']
