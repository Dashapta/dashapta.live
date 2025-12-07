from django.db import models
from django.contrib.auth.hashers import make_password
from authentication.models import PaymentInfo  # Adjust this import path as per your project
import random

from django.utils.crypto import get_random_string
from django.core.exceptions import ValidationError

class Member(models.Model):
    # --- Required Signup Fields ---
    custom_id = models.CharField(max_length=10, unique=True, blank=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=255)  # Store hashed password

    # --- Foreign Key ---
    reference = models.ForeignKey(PaymentInfo, on_delete=models.SET_NULL, null=True, blank=True)

    # --- Optional Membership Fields ---
    occupation = models.CharField(max_length=150, null=True, blank=True)
    application_date = models.DateField(null=True, blank=True)
    membership_type = models.CharField(
    max_length=50,
    choices=[('regular', 'Regular'), ('exclusive', 'Exclusive'), ('vip', 'VIP')],
    null=True,
    blank=True
)
    full_name = models.CharField(max_length=150, null=True, blank=True)
    place_of_birth = models.CharField(max_length=150, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    full_address = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True)
    nationality = models.CharField(max_length=100, null=True, blank=True)
    postcode = models.CharField(max_length=20, null=True, blank=True)
    religion = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
   
    driving_license = models.CharField(max_length=10, null=True, blank=True)
    signature_photo = models.ImageField(upload_to='signatures/', null=True, blank=True)
    payment_screenshot = models.ImageField(upload_to='payments/', null=True, blank=True)
    utr_transaction_id = models.CharField(max_length=100, null=True, blank=True)


    def generate_unique_custom_id(self):
        prefix = "DSTL"
        while True:
            random_number = ''.join(random.choices("0123456789", k=5))
            custom_id = f"{prefix}{random_number}"
            if not Member.objects.filter(custom_id=custom_id).exists():
                return custom_id

    def save(self, *args, **kwargs):
        if not self.custom_id:
            self.custom_id = self.generate_unique_custom_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

from .models import Member  # Adjust to your actual app name

class LoanApplication(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    # Loan Details
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    loan_tenure = models.CharField(max_length=20)
    loan_purpose = models.CharField(max_length=100)
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2)

    # Personal Info (redundant, saved for historical record)
    full_name = models.CharField(max_length=150)
    mobile = models.CharField(max_length=10)
    email = models.EmailField()
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    pan = models.CharField(max_length=10)
    aadhar = models.CharField(max_length=12)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)
    address = models.TextField()
    duration = models.CharField(max_length=100)

    # Nominee Info
    nominee1_name = models.CharField(max_length=100)
    nominee1_mobile = models.CharField(max_length=10)
    nominee1_aadhar = models.CharField(max_length=12)
    nominee2_name = models.CharField(max_length=100)
    nominee2_mobile = models.CharField(max_length=10)
    nominee2_aadhar = models.CharField(max_length=12)

    # Document Uploads
    supporting_document_type = models.CharField(max_length=100)
    supporting_document = models.FileField(upload_to='loan_documents/')
    other_docs_explain = models.TextField(blank=True, null=True)
    signature = models.ImageField(upload_to='signatures/')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.loan_amount}"