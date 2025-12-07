import os
import random
from django.db import models
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

def generate_unique_uuid():
    prefix = "SJY"
    while True:
        number = random.randint(100000, 999999)
        new_id = f"{prefix}{number}"
        if not Scholarship.objects.filter(uuid=new_id).exists():
            return new_id
def validate_phone_number(value):
    if not value.isdigit() or len(value) != 10:
        raise ValidationError("Phone number must be exactly 10 digits.")
def upload_to(instance, filename):
    return os.path.join("scholarship", str(instance.uuid), filename)

class Scholarship(models.Model):
    uuid = models.CharField(max_length=9, primary_key=True, editable=False, unique=True)
    
    aadhar_card_number = models.CharField(max_length=12, unique=True,blank=True, null=True)
    aadhar_photo = models.ImageField(upload_to=upload_to, blank=True, null=True)
    
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    
    phone_number = models.CharField(max_length=10, unique=True, validators=[validate_phone_number])
    password = models.CharField(max_length=128)

    parent_name = models.CharField(max_length=100, blank=True, null=True)
    parent_phone_number = models.CharField(max_length=15, blank=True, null=True)

    permanent_address = models.TextField(blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    taluk = models.CharField(max_length=100, blank=True, null=True)

    board_of_education = models.CharField(max_length=100, blank=True, null=True)
    present_class = models.CharField(max_length=50, blank=True, null=True)
    marks_obtained = models.CharField(max_length=50, blank=True, null=True)

    college_name = models.CharField(max_length=255, blank=True, null=True)

    agentid = models.ForeignKey(
    'authentication.PaymentInfo',  # 'appname.ModelName'
    on_delete=models.SET_NULL,
    blank=True,
    null=True,
    related_name="students"
)

    student_photo = models.ImageField(upload_to=upload_to, blank=True, null=True)
    study_certificate_photo = models.ImageField(upload_to=upload_to, blank=True, null=True)
    payment_screenshot = models.ImageField(upload_to=upload_to, blank=True, null=True)

    utr_transaction_id = models.CharField(max_length=100, unique=True, blank=True, null=True)
    account_holder_name = models.CharField(max_length=100, blank=True, null=True)
    account_number = models.CharField(max_length=20, blank=True, null=True)
    ifsc_code = models.CharField(max_length=15, blank=True, null=True)
    passbook_photo = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Assign UUID on first save
        if not self.uuid:
            self.uuid = generate_unique_uuid()

        # Hash the password if needed
        if self.password and not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.uuid} - {self.first_name or ''} {self.last_name or ''}"

class SupportQuery(models.Model):
    uuid = models.CharField(max_length=9)  # student ID from localStorage
    query_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query from {self.uuid} at {self.created_at.strftime('%Y-%m-%d %H:%M')}"
