from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Member,LoanApplication

class MemberSerializer(serializers.ModelSerializer):
    referenceId = serializers.PrimaryKeyRelatedField(
        source='reference',
        queryset=Member._meta.get_field('reference').related_model.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Member
        exclude = ['custom_id', 'password']  # Do NOT allow password update here
        extra_kwargs = {
            'signature_photo': {'required': False},
            'payment_screenshot': {'required': False},
        }

    def to_internal_value(self, data):
        # Remove frontend-only fields like `membershipName` if accidentally sent
        data = super().to_internal_value({k: v for k, v in data.items() if k != 'membershipName'})
        return data


class MemberSignupSerializer(serializers.ModelSerializer):
    # Extra field to accept referral code (custom_id of PaymentInfo)
    referral_id = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Member
        fields = [
            'first_name',
            'last_name',
            'phone',
            'password',
            'referral_id',  # not part of model, used to link to PaymentInfo
        ]

        
class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = '__all__'