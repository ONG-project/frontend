import uuid
from django.db import models


class NGO(models.Model):
    class VerificationStatus(models.TextChoices):
        VERIFIED = 'verified', 'Verified'
        ANALYSIS = 'analysis', 'In Analysis'
        PENDING = 'pending', 'Pending'
        INCONSISTENT = 'inconsistent', 'Inconsistent'

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Primary key (UUID) for the NGO",
    )
    external_api_id = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="External API ID if integrated",
    )
    name = models.CharField(
        max_length=255,
        help_text="Name of the NGO",
    )
    cnpj = models.CharField(
        max_length=18,
        unique=True,
        help_text="CNPJ of the NGO (formatted or unformatted)",
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Detailed description of the NGO",
    )
    focus_area = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Focus area of the NGO",
    )
    city = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="City where the NGO is registered",
    )
    state = models.CharField(
        max_length=2,
        blank=True,
        null=True,
        help_text="State abbreviation (UF)",
    )
    current_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0.00,
        blank=True,
        null=True,
        help_text="Current evaluation score (0-100)",
    )
    years_operating = models.PositiveIntegerField(
        default=0,
        help_text="Years of operation based on CNPJ opening date",
    )
    address_valid = models.BooleanField(
        default=False,
        help_text="Whether the registered address matches public CEP data",
    )
    verification_status = models.CharField(
        max_length=20,
        choices=VerificationStatus.choices,
        default=VerificationStatus.PENDING,
        help_text="Current verification status of the NGO",
    )
    last_verified_at = models.DateTimeField(
        blank=True,
        null=True,
        help_text="Timestamp of the last automated verification",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Flag indicating if the NGO CNPJ is active",
    )
    social_networks = models.JSONField(
        default=list,
        blank=True,
        help_text=(
            "List of social network entries, e.g. "
            '[{"platform": "instagram", "handle": "@ong"}]'
        ),
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the record was created",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when the record was last updated",
    )

    class Meta:
        db_table = 'ngo'
        verbose_name = "NGO"
        verbose_name_plural = "NGOs"

    def __str__(self):
        return self.name
