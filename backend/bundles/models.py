import uuid
from django.db import models


class Bundle(models.Model):
    """A collective campaign backed by multiple NGOs."""

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.CharField(max_length=255)
    cause = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    raised_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    match_multiplier = models.PositiveSmallIntegerField(default=1)
    match_sponsor = models.CharField(max_length=255, blank=True, null=True)
    ngos = models.ManyToManyField(
        'verification.NGO',
        related_name='bundles',
        blank=True,
    )
    eligibility_rules = models.JSONField(
        default=list,
        blank=True,
        help_text="List of eligibility rule strings",
    )
    distribution_rules = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bundle'
        ordering = ['-created_at']

    def __str__(self):
        return self.name
