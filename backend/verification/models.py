import uuid
from django.db import models

class NGO(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        help_text="Primary key (UUID) for the NGO"
    )
    external_api_id = models.CharField(
        max_length=255, 
        blank=True, 
        null=True,
        help_text="External API ID if integrated"
    )
    name = models.CharField(
        max_length=255,
        help_text="Name of the NGO"
    )
    cnpj = models.CharField(
        max_length=18, 
        unique=True,
        help_text="CNPJ of the NGO (formatted or unformatted)"
    )
    description = models.TextField(
        blank=True, 
        null=True,
        help_text="Detailed description of the NGO"
    )
    focus_area = models.CharField(
        max_length=255, 
        blank=True, 
        null=True,
        help_text="Focus area of the NGO"
    )
    current_score = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=0.00,
        blank=True, 
        null=True,
        help_text="Current evaluation score"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Flag indicating if the NGO is active"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the record was created"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when the record was last updated"
    )
    social_networks = models.CharField(
        max_length=255, 
        blank=True, 
        null=True,
        help_text="NGO's social network(S), if exsistent"
    )

    class Meta:
        db_table = 'ngo'
        verbose_name = "NGO"
        verbose_name_plural = "NGOs"

    def __str__(self):
        return self.name
