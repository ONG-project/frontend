from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, date
import uuid
import json

from verification.models import NGO, Campaign
from bundles.models import Bundle


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
    help = 'Seeds demo NGOs, Campaigns and Bundles for local development'

    def handle(self, *args, **options):
        now = timezone.now()
        ngo_created = 0
        ngo_updated = 0

        # ── 1. Seed NGOs ─────────────────────────────────────────────────────
        ngo_map = {}
        for data in DEMO_NGOS:
            defaults = {**data, 'is_active': True, 'last_verified_at': now}
            cnpj = data['cnpj']
            ngo, was_created = NGO.objects.update_or_create(
                cnpj=cnpj,
                defaults=defaults,
            )
            ngo_map[data['name']] = ngo
            if was_created:
                ngo_created += 1
            else:
                ngo_updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'NGOs ready: {ngo_created} created, {ngo_updated} updated.'
            )
        )

        # ── 2. Seed Campaigns ────────────────────────────────────────────────
        DEMO_CAMPAIGNS = [
            {
                'name': 'Reflorestamento de Nascentes',
                'ngo': ngo_map['Instituto Rebrota'],
                'description': (
                    'Recuperação direta de 5 nascentes degradadas no entorno urbano de Manaus '
                    'com o plantio planejado de 10 mil mudas de espécies nativas.'
                ),
                'cause': 'meio-ambiente',
                'status': 'publicada',
                'target_amount': 20000,
                'raised_amount': 14200,
                'end_date': date.today() + timedelta(days=12),
                'match_multiplier': 3,
                'match_sponsor': 'BioCorp S.A.',
                'match_cap': 30000.00,
                'match_period': 'Junho a Agosto de 2026',
                'requirements': 'As mudas devem ser apenas de espécies nativas da Amazônia.',
                'destination': 'Compra das mudas e contratação de mão-de-obra local.',
                'location': 'Manaus, AM',
            },
            {
                'name': 'Água Saudável nas Escolas',
                'ngo': ngo_map['Águas Limpas Brasil'],
                'description': (
                    'Instalação de filtros de carvão ativo e reservatórios higienizados em '
                    '12 escolas públicas ribeirinhas na região do Baixo Amazonas.'
                ),
                'cause': 'saude',
                'status': 'publicada',
                'target_amount': 35000,
                'raised_amount': 18000,
                'end_date': date.today() + timedelta(days=5),
                'match_multiplier': 1,
                'match_sponsor': None,
                'location': 'Santarém, PA',
            },
            {
                'name': 'Bolsas para Desenvolvedoras',
                'ngo': ngo_map['Educação Sem Fronteiras'],
                'description': (
                    'Financiamento completo de cursos intensivos de desenvolvimento de software '
                    'e fornecimento de notebooks para 30 mulheres da periferia paulistana.'
                ),
                'cause': 'educacao',
                'status': 'publicada',
                'target_amount': 50000,
                'raised_amount': 42000,
                'end_date': date.today() + timedelta(days=22),
                'match_multiplier': 2,
                'match_sponsor': 'TechFund Brasil',
                'match_cap': 25000.00,
                'location': 'São Paulo, SP',
            },
        ]

        camp_created = 0
        camp_updated = 0
        for data in DEMO_CAMPAIGNS:
            _, was_created = Campaign.objects.update_or_create(
                name=data['name'],
                ngo=data['ngo'],
                defaults={
                    'description': data['description'],
                    'cause': data['cause'],
                    'status': data.get('status', 'rascunho'),
                    'target_amount': data['target_amount'],
                    'raised_amount': data['raised_amount'],
                    'end_date': data.get('end_date'),
                    'match_multiplier': data['match_multiplier'],
                    'match_sponsor': data['match_sponsor'],
                    'match_cap': data.get('match_cap'),
                    'match_period': data.get('match_period', ''),
                    'requirements': data.get('requirements', ''),
                    'destination': data.get('destination', ''),
                    'location': data['location'],
                    'is_active': True,
                }
            )
            if was_created:
                camp_created += 1
            else:
                camp_updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Campaigns ready: {camp_created} created, {camp_updated} updated.'
            )
        )

        # ── 3. Seed Bundles ──────────────────────────────────────────────────
        DEMO_BUNDLES = [
            {
                'name': 'Aliança Amazônia Viva',
                'cause': 'meio-ambiente',
                'description': (
                    'Um esforço conjunto para restaurar áreas degradadas, combater queimadas e '
                    'capacitar comunidades tradicionais na bioeconomia florestal. Unindo a expertise '
                    'de organizações líderes em conservação ativa.'
                ),
                'target_amount': 150000,
                'raised_amount': 98400,
                'match_multiplier': 3,
                'match_sponsor': 'Fundação Clima Global',
                'eligibility_rules': [
                    'Atuação comprovada de no mínimo 3 anos na Bacia Amazônica.',
                    'Score de transparência na plataforma superior a 90/100.',
                    'Apresentação de relatórios trimestrais de impacto socioambiental.',
                    'Adesão ao código de ética e conduta da plataforma ONG+.',
                ],
                'distribution_rules': (
                    'Os recursos deste bundle são distribuídos de forma paritária (50% para cada ONG '
                    'participante). Os repasses ocorrem mensalmente sob condição de entrega das '
                    'prestações de contas parciais e relatórios de atividades.'
                ),
                'ngo_names': ['Instituto Rebrota', 'Águas Limpas Brasil'],
            },
            {
                'name': 'Futuro Brilhante',
                'cause': 'educacao',
                'description': (
                    'Fundo coletivo destinado a equipar escolas comunitárias de periferias com '
                    'laboratórios de informática, além de oferecer bolsas de estudos de programação '
                    'para jovens talentos.'
                ),
                'target_amount': 80000,
                'raised_amount': 32000,
                'match_multiplier': 1,
                'match_sponsor': None,
                'eligibility_rules': [
                    'Foco direto em educação básica ou capacitação tecnológica profissional.',
                    'Score de transparência na plataforma superior a 85/100.',
                    'Demonstração financeira anual auditada externamente.',
                ],
                'distribution_rules': (
                    'A distribuição é proporcional ao score de transparência das organizações '
                    'participantes, otimizando o repasse em favor da excelência na prestação de contas.'
                ),
                'ngo_names': ['Educação Sem Fronteiras', 'Vozes da Comunidade'],
            },
        ]

        bundle_created = 0
        bundle_updated = 0
        for data in DEMO_BUNDLES:
            ngo_names = data.pop('ngo_names')
            bundle, was_created = Bundle.objects.update_or_create(
                name=data['name'],
                defaults={**data, 'is_active': True},
            )
            bundle.ngos.set([ngo_map[n] for n in ngo_names if n in ngo_map])
            if was_created:
                bundle_created += 1
            else:
                bundle_updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Bundles ready: {bundle_created} created, {bundle_updated} updated.'
            )
        )
