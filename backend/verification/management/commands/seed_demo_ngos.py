from django.core.management.base import BaseCommand
from django.utils import timezone

from verification.models import NGO


DEMO_NGOS = [
    {
        'name': 'Instituto Rebrota',
        'cnpj': '12345678000190',
        'description': (
            'Nossa missão é restaurar o equilíbrio ecológico através da biodiversidade urbana. '
            'Transformamos espaços cinzas em pulmões vivos, conectando comunidades à regeneração '
            'ativa da Floresta Amazônica em perímetros municipais.'
        ),
        'focus_area': 'meio-ambiente',
        'city': 'Manaus',
        'state': 'AM',
        'current_score': 100,
        'years_operating': 16,
        'address_valid': True,
        'verification_status': NGO.VerificationStatus.VERIFIED,
        'social_networks': [
            {'platform': 'instagram', 'handle': '@institutorebrota'},
            {'platform': 'facebook', 'handle': '/institutorebrota'},
        ],
    },
    {
        'name': 'Águas Limpas Brasil',
        'cnpj': '98765432000110',
        'description': (
            'Projetos de saneamento básico e acesso à água potável em comunidades '
            'ribeirinhas do Norte e Nordeste.'
        ),
        'focus_area': 'saude',
        'city': 'Santarém',
        'state': 'PA',
        'current_score': 75,
        'years_operating': 12,
        'address_valid': True,
        'verification_status': NGO.VerificationStatus.VERIFIED,
        'social_networks': [{'platform': 'instagram', 'handle': '@aguaslimpas'}],
    },
    {
        'name': 'Educação Sem Fronteiras',
        'cnpj': '45123890000155',
        'description': (
            'Promovemos acesso à educação de qualidade para jovens em situação de '
            'vulnerabilidade através de bolsas e mentoria educacional.'
        ),
        'focus_area': 'educacao',
        'city': 'São Paulo',
        'state': 'SP',
        'current_score': 50,
        'years_operating': 9,
        'address_valid': False,
        'verification_status': NGO.VerificationStatus.ANALYSIS,
        'social_networks': [],
    },
    {
        'name': 'Vozes da Comunidade',
        'cnpj': '11222333000144',
        'description': (
            'Defesa e fomento dos direitos humanos através de suporte legal, '
            'capacitação e denúncia de violações em áreas periféricas.'
        ),
        'focus_area': 'direitos-humanos',
        'city': 'Rio de Janeiro',
        'state': 'RJ',
        'current_score': 100,
        'years_operating': 14,
        'address_valid': True,
        'verification_status': NGO.VerificationStatus.VERIFIED,
        'social_networks': [
            {'platform': 'instagram', 'handle': '@vozesdacomunidade'},
        ],
    },
]


class Command(BaseCommand):
    help = 'Seeds demo NGOs with scores for local development'

    def handle(self, *args, **options):
        now = timezone.now()
        created = 0
        updated = 0

        for data in DEMO_NGOS:
            defaults = {
                **data,
                'is_active': True,
                'last_verified_at': now,
            }
            cnpj = data['cnpj']
            _, was_created = NGO.objects.update_or_create(
                cnpj=cnpj,
                defaults=defaults,
            )
            if was_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Demo NGOs ready: {created} created, {updated} updated.'
            )
        )
