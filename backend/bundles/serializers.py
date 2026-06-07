from verification.constants import CAUSE_LABELS
from bundles.models import Bundle


def _score_int(ngo) -> int:
    if ngo.current_score is None:
        return 0
    return int(float(ngo.current_score))


def _location(ngo) -> str:
    if ngo.city and ngo.state:
        return f'{ngo.city}, {ngo.state}'
    if ngo.city:
        return ngo.city
    if ngo.state:
        return ngo.state
    return ''


def serialize_bundle_list_item(bundle: Bundle) -> dict:
    cause = bundle.cause or ''
    ngo_list = list(bundle.ngos.all())
    scores = [_score_int(n) for n in ngo_list]
    transparency_score = (
        round(sum(scores) / len(scores)) if scores else 0
    )
    return {
        'id': str(bundle.id),
        'name': bundle.name,
        'cause': cause,
        'causeLabel': CAUSE_LABELS.get(cause, cause.replace('-', ' ').title()),
        'description': bundle.description or '',
        'targetAmount': float(bundle.target_amount),
        'raisedAmount': float(bundle.raised_amount),
        'matchMultiplier': bundle.match_multiplier,
        'matchSponsor': bundle.match_sponsor,
        'transparencyScore': transparency_score,
        'ongs': [
            {'id': str(n.id), 'name': n.name, 'score': _score_int(n)}
            for n in ngo_list
        ],
    }


def serialize_bundle_detail(bundle: Bundle) -> dict:
    base = serialize_bundle_list_item(bundle)
    ngo_list = list(bundle.ngos.all())
    base.update({
        'eligibilityRules': bundle.eligibility_rules or [],
        'distributionRules': bundle.distribution_rules or '',
        'ongs': [
            {
                'id': str(n.id),
                'name': n.name,
                'score': _score_int(n),
                'location': _location(n),
            }
            for n in ngo_list
        ],
    })
    return base
