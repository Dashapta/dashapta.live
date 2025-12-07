from django.db import models

# Create your models here.
import random
from django.db import models

def generate_custom_uuid():
    while True:
        random_digits = ''.join(random.choices('0123456789', k=4))
        custom_uuid = f"DSPT{random_digits}"
        if not PaymentInfo.objects.filter(custom_id=custom_uuid).exists():
            return custom_uuid

class PaymentInfo(models.Model):
    custom_id = models.CharField(max_length=8, unique=True, editable=False, default=generate_custom_uuid)
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15,unique=True)
    password = models.CharField(max_length=128)
    account_holder_name = models.CharField(max_length=150)
    utr_id = models.CharField(max_length=100, unique=True)
    payment_screenshot = models.ImageField(upload_to='payment_screenshots/')
    application_fees = models.CharField(max_length=10, blank=True, null=True)
    agentid = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='referred_users'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.custom_id} - {self.first_name} {self.last_name}"