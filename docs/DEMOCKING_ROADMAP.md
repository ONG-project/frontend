# Frontend Democking & Backend Integration Roadmap

**Status:** In Progress  
**Last Updated:** June 7, 2026  
**Priority:** High - Feature completeness and MVP validation

---

## Overview

This document outlines the remaining tasks to remove mocked data from the frontend and properly integrate with backend APIs. The current frontend has several pages using hardcoded mock data, while the backend provides API endpoints that need to be consumed.

---

## Task Summary

| Task | Status | Priority | Impact | Components Affected |
|------|--------|----------|--------|-------------------|
| Remove "Doadores" tab from Management | TODO | Medium | UI/UX - Feature removal | NgoManagementPage |
| Demock Transparency Page | TODO | High | Data integration | TransparencyPage, hooks |
| Demock ONG Transparency in Profile | TODO | High | Data integration | NgoTransparencyPage, NgoProfilePage |
| Demock & Individualize Donor Profile | TODO | High | User data | DonorProfilePage |
| Demock Management Profile (NGO) | TODO | **CRITICAL** | Core functionality | NgoManagementPage |
| Fix Donation Page navbar button | TODO | Medium | Navigation/UX | DonationPage, Navbar, CausesPage |
| Remove "Donate to Fund" button | TODO | Low | UI/UX | CausesPage |

---

## Detailed Task Breakdown

### 1. Remove "Doadores" Tab from Management Page
**File:** `frontend/src/Pages/NgoManagementPage.jsx`  
**Reason:** Feature is currently unproductive; mock data only, no backend integration  

#### Mocked Areas:
```jsx
// Line 56: Tab state for donors
const [donorSection, setDonorSection] = useState('doadores');

// Line 58-61: Donor filter and search states
const [donorFilter, setDonorFilter] = useState('Todos');
const [searchQuery, setSearchQuery] = useState('');

// Line 135-140: Mock donor rows (hardcoded data)
const donorRows = [
  { initials: 'AS', color: 'bg-[#B2E4E1] text-[#0A665C]', name: 'Alice Schmidt', ... },
  { initials: 'RM', color: 'bg-[#CBD9ED] text-indigo-700', name: 'Ricardo Mendes', ... },
  { initials: 'HB', color: 'bg-gray-200 text-gray-600', name: 'Helena Barbosa', ... },
  { initials: 'CP', color: 'bg-[#DCEDC8] text-[#0A665C]', name: 'Clara Peroli', ... }
];

// Line 760-886: Entire "VIEW 3: Doadores" section (126 lines of UI code)
// Shows filtered donor list with table, search, and filter functionality
```

#### Tasks:
- [ ] Remove `donorSection` state (line 56)
- [ ] Remove `donorFilter`, `searchQuery` states (lines 58-61)
- [ ] Delete `donorRows` array (lines 135-140)
- [ ] Delete `filteredDonors` computation (lines 142-147)
- [ ] Remove "Doadores" tab from navigation array (line 305)
- [ ] Delete entire "VIEW 3: Doadores" section (lines 760-886)
- [ ] Remove `donorSection` state management and rendering logic

#### Result:
- 4 main tabs instead of 5: Visão Geral, Campanhas, Relatórios, Alterações Cadastrais

---

### 2. Demock Transparency Page (Global/Public)
**File:** `frontend/src/Pages/TransparencyPage.jsx`  
**Hook:** `frontend/src/hooks/useGlobalTransparency.js`  

#### Current State:
The page is already partially connected to backend via the `useGlobalTransparency` hook. However, it may still have mock data fallbacks.

#### Mocked Areas to Identify & Remove:
```jsx
// Components rendering mock data:
- <GlobalMetricsCard metrics={metrics} role={role} />
- <AllocationCriteriaPanel criteria={criteria} role={role} />
- <ResourceDistributionTable transfers={transfers} role={role} />
```

#### Tasks:
- [ ] Audit `useGlobalTransparency.js` hook for mock data fallbacks
- [ ] Verify all API endpoints are real:
  - GET `/v1/transparency/metrics/` (global metrics)
  - GET `/v1/transparency/transfers/` (resource distributions)
  - GET `/v1/transparency/criteria/` (allocation criteria)
- [ ] Remove any hardcoded fallback data
- [ ] Ensure error handling shows meaningful messages if backend is unavailable
- [ ] Test with real data from backend

#### Expected Data Structure:
```json
{
  "metrics": {
    "totalCollected": number,
    "totalDistributed": number,
    "avgNgoScore": number,
    "ngoCount": number
  },
  "transfers": [{
    "id": string,
    "fromDate": date,
    "toDate": date,
    "amount": number,
    "ngo": string,
    "criteria": string
  }],
  "criteria": [{
    "name": string,
    "description": string,
    "weight": number
  }]
}
```

---

### 3. Demock ONG Transparency Page (in NGO Profile)
**File:** `frontend/src/Pages/NgoTransparencyPage.jsx`  
**Hook:** `frontend/src/hooks/useTransparency.js`  
**Parent:** `frontend/src/Pages/NgoProfilePage.jsx`

#### Current State:
Uses the `useTransparency` hook with an `ongId` parameter. Should fetch ONG-specific transparency data.

#### Mocked Areas:
```jsx
// Line 30-60: Mock ONG profile data assembly (resolvedOng object)
// These are hardcoded fallbacks when API data is missing:
const resolvedOng = {
  name: data.profile?.name || ong?.name || '—',
  cnpj: data.profile?.cnpj || ong?.cnpj || '',
  location: data.profile?.location || ong?.location || '',
  operatingSince: data.profile?.yearsOperating ? `${data.profile.yearsOperating} anos` : (ong?.operatingSince || '—'),
  score: apiScore,
  budgetUtilization: data.financial?.budgetUtilization ?? ong?.budgetUtilization ?? 0,
  lastAudit: data.profile?.lastExternalAudit || ong?.lastAudit || '—',
  auditStatus: data.verification?.status || ong?.auditStatus || '—',
  verified: apiVerified,
};
```

#### Tasks:
- [ ] Verify API endpoint exists: GET `/v1/ngos/{ngoId}/transparency/`
- [ ] Check backend returns all required fields:
  - `profile` (name, cnpj, location, yearsOperating, lastExternalAudit)
  - `verification` (status, criteria with score)
  - `financial` (budgetUtilization, transfers, expenses)
- [ ] Remove all fallback values and mock data paths
- [ ] Ensure page requires ONG data from props or API, not localStorage
- [ ] Add validation to redirect if NGO not found
- [ ] Test with real ONG IDs from backend

#### Backend Integration Points:
```
GET /v1/ngos/{ngoId}/verification/
GET /v1/ngos/{ngoId}/transparency/
GET /v1/ngos/{ngoId}/campaigns/
GET /v1/ngos/{ngoId}/financial-data/
```

---

### 4. Demock & Individualize Donor Profile
**File:** `frontend/src/Pages/DonorProfilePage.jsx`

#### Current Mocked Areas:
```jsx
// Line 14-27: Mock causes data from localStorage
const [causes, setCauses] = useState(() => {
  const saved = localStorage.getItem('donor_causes');
  // Fallback hardcoded causes:
  { id: 'env', label: 'Meio Ambiente', active: true, icon: Globe, ... },
  { id: 'edu', label: 'Educação', active: true, icon: BookOpen, ... },
  { id: 'urg', label: 'Urgência', active: true, icon: AlertTriangle, ... },
  { id: 'cli', label: 'Clima', active: true, icon: Wind, ... }
});

// Line 28-35: Mock donations array (hardcoded donor history)
const donations = [
  {
    id: 1,
    date: '12 Oct 2024',
    ngo: 'Instituto Rebrota',
    cause: 'Meio Ambiente',
    value: 'R$ 150,00',
    icon: Globe
  },
  // ... 2 more hardcoded donations
];
```

#### Page Content - Hardcoded Mock Data:
```jsx
// Line 138: Hardcoded donor name
<h1 className="text-4xl font-extrabold text-[#0A3D36]">João Silva</h1>

// Line 140-142: Hardcoded impact statement
<p>Sua contribuição ajudou a restaurar 15 hectares de floresta 
   e apoiou 3 ONGs locais.</p>

// Line 155: Hardcoded total donated
<h2 className="text-3xl font-extrabold">R$ 450,00</h2>

// Lines showing mock stats:
- 3 ONGs Apoiadas
- 4 Causas Favoritas
- 12 Doações Realizadas
```

#### Tasks:
- [ ] Create `DonorProfileService` to fetch authenticated donor data
- [ ] Implement API endpoint: `GET /v1/donors/profile/` (authenticated)
- [ ] Replace hardcoded name "João Silva" with `user.name` from AuthContext
- [ ] Fetch actual donation history: `GET /v1/donors/donations/`
- [ ] Fetch donor's cause preferences: `GET /v1/donors/cause-preferences/`
- [ ] Calculate actual impact metrics from backend:
  - Total hectares/items helped
  - Actual number of NGOs supported
  - Real donation count and total value
- [ ] Remove localStorage-based cause management; use backend
- [ ] Implement cause preference updates: `PATCH /v1/donors/cause-preferences/`
- [ ] Add loading states for all async operations
- [ ] Handle cases where donor has no donations yet

#### Expected Data Structure:
```json
{
  "profile": {
    "id": uuid,
    "name": string,
    "email": string,
    "joinedAt": date,
    "bio": string,
    "impactMetrics": {
      "hectaresHelped": number,
      "personsHelped": number,
      "ngoCount": number,
      "totalDonated": number
    }
  },
  "causePeferences": [
    { id: uuid, name: string, active: boolean }
  ],
  "donations": [{
    "id": uuid,
    "date": date,
    "amount": number,
    "ngo": { id: uuid, name: string },
    "campaign": { id: uuid, name: string } | null,
    "receiptUrl": string
  }]
}
```

---

### 5. Demock Management Profile (NGO) - **CRITICAL**
**File:** `frontend/src/Pages/NgoManagementPage.jsx`  
**Parent Service:** `frontend/src/services/ngoService.js`

#### Current Mocked Areas:

##### 5.1 Donor List (if not removed, needs democking)
```jsx
// Line 135-140: Mock donor rows
const donorRows = [
  { initials: 'AS', name: 'Alice Schmidt', email: 'alice.schmidt@email.com', ... },
  { initials: 'RM', name: 'Ricardo Mendes', email: 'mendes.r@provedor.net', ... },
  { initials: 'HB', name: 'Helena Barbosa', email: 'helena.b@site.com', ... },
  { initials: 'CP', name: 'Clara Peroli', email: 'clara.peroli@gmail.com', ... }
];
```

##### 5.2 Report Generation Options
```jsx
// Line 62-67: Report states for export
const [period, setPeriod] = useState('30-days');
const [includeFinance, setIncludeFinance] = useState(true);
const [includeDonors, setIncludeDonors] = useState(true);
const [includeCampaigns, setIncludeCampaigns] = useState(false);
const [includeCnpj, setIncludeCnpj] = useState(true);

// These render UI but probably don't execute real export
```

#### Tasks (CRITICAL - affects core ONG functionality):
- [ ] Implement real report generation:
  - [ ] Create backend endpoint: `POST /v1/ngos/{ngoId}/reports/generate/`
  - [ ] Support parameters: period, includeFinance, includeDonors, includeCampaigns, includeCnpj
  - [ ] Return PDF or CSV file download
- [ ] Fix Campaign Management (if not already working):
  - [ ] Verify `ngoService.getNgoCampaigns(ngoId)` returns real data
  - [ ] Verify campaign creation: `POST /v1/ngos/{ngoId}/campaigns/`
  - [ ] Test all campaign status workflows
- [ ] Verify NGO Details are fully fetched:
  - [ ] GET `/v1/ngos/{ngoId}/` returns complete profile
  - [ ] Show real CNPJ, name, score, last audit date
- [ ] Implement real donor list fetching (if keeping "Doadores" tab):
  - [ ] Create endpoint: `GET /v1/ngos/{ngoId}/donors/`
  - [ ] Support filtering and search
  - [ ] Show real donation history per donor
- [ ] Transparency/Score Dashboard:
  - [ ] Verify GET `/v1/ngos/{ngoId}/transparency/` is implemented
  - [ ] Real score calculation from backend
  - [ ] Real audit date tracking
- [ ] Implement "Send New Audit" button:
  - [ ] Create endpoint: `POST /v1/ngos/{ngoId}/audit/upload/`
  - [ ] File upload functionality
  - [ ] Success/error handling

#### Data Flow to Implement:
```
Page Load:
  1. useAuth() → get current user + ngoId
  2. ngoService.list() → resolve UUID from API (not localStorage)
  3. ngoService.getById(ngoId) → fetch NGO details
  4. ngoService.getNgoCampaigns(ngoId) → fetch campaigns
  5. ngoService.getVerification(ngoId) → fetch verification/transparency data
  6. ngoService.listBundles() → fetch bundles participating in

Campaign Actions:
  - Create: POST /v1/ngos/{ngoId}/campaigns/
  - Edit: PUT /v1/campaigns/{campaignId}/
  - Change Status: PATCH /v1/campaigns/{campaignId}/status/
  - Duplicate: POST /v1/campaigns/{campaignId}/duplicate/
  - Archive: PATCH /v1/campaigns/{campaignId}/status/ (status=arquivada)
```

---

### 6. Fix Donation Page & Navigation
**Files:** 
- `frontend/src/Pages/DonationPage.jsx`
- `frontend/src/Pages/CausesPage.jsx`
- `frontend/src/components/Navbar.jsx`

#### Current Issues:

##### 6.1 Navbar Donation Button Problem
**Location:** Navbar on Causes page, line ~287 in CausesPage  
**Issue:** "Donate to Our Fund" button navigates to `/doacao` but there's no specific fund context  
**Button:** "Doar para o nosso fundo"

#### Issues to Fix:
- [ ] Remove navbar donation button entirely OR
- [ ] Make it navigate to `/causas` instead (causes page)
- [ ] If removed, test that all nav flows still work

#### 6.2 Donation Page Flow
**Current Flow Issues:**
```jsx
// Currently tries to:
1. Check route.state for context (ngoId, campaignId, bundleId)
2. If no context, fetch average score of all NGOs
3. If context is "bundle", use default score 95
```

#### Tasks:
- [ ] Clarify ONG+ Fund donation semantics (is it a dedicated bundle?)
- [ ] If "Fund" is special entity:
  - [ ] Create backend entity `/v1/bundles/ongplus-fund/`
  - [ ] Update navbar button to pass correct bundle ID
- [ ] If "Fund" should redirect to causes:
  - [ ] Remove/replace navbar "Donate" button to redirect to `/causas`
  - [ ] Remove handling for generic fund donations in DonationPage

#### Verification:
- [ ] Can donate to individual ONG directly
- [ ] Can donate to individual Campaign
- [ ] Can donate to Bundle
- [ ] Donation flow completes without errors

---

### 7. Remove "Donate to Fund" Button
**File:** `frontend/src/Pages/CausesPage.jsx`  
**Location:** Line ~287

#### Current Code:
```jsx
<button 
  onClick={() => navigate('/doacao')}
  className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white py-3.5 px-6 rounded-full font-bold text-xs flex items-center justify-center space-x-2.5 shadow-md transition-colors cursor-pointer"
>
  <Heart className="w-4 h-4 fill-white" />
  <span>Doar para o nosso fundo</span>
</button>
```

#### Task:
- [ ] Remove this button entirely from CausesPage
- [ ] Verify causes/campaigns/bundles are the only donation paths
- [ ] Test page renders correctly after removal

#### Result:
Only two call-to-action buttons on causes sidebar:
1. "Suporte & Ajuda" (support modal)
2. (Maybe) Search/filter for causes

---

## Implementation Order (Recommended)

1. **First:** Task #7 - Remove "Donate to Fund" button (simplest, ~5 min)
2. **Second:** Task #1 - Remove "Doadores" tab (medium complexity, ~30 min)
3. **Third:** Task #6 - Fix Donation Page navigation (depends on decisions above, ~20 min)
4. **Fourth:** Task #2 - Demock Transparency Page (verify backend exists, ~1 hour)
5. **Fifth:** Task #3 - Demock ONG Transparency (verify backend exists, ~1 hour)
6. **Sixth:** Task #4 - Demock Donor Profile (requires new backend endpoints, ~2 hours)
7. **Seventh:** Task #5 - Demock Management Profile **CRITICAL** (requires multiple backend endpoints, ~3-4 hours)

---

## Backend Endpoints Summary

### Endpoints Already Implemented (Verify):
- ✅ GET `/v1/ngos/` - List all NGOs
- ✅ GET `/v1/ngos/{ngoId}/` - Get single NGO
- ✅ GET `/v1/ngos/{ngoId}/verification/` - Get verification data
- ✅ GET `/v1/campaigns/` - List all campaigns
- ✅ GET `/v1/ngos/{ngoId}/campaigns/` - Get NGO's campaigns
- ✅ POST `/v1/ngos/{ngoId}/campaigns/` - Create campaign
- ✅ PUT `/v1/campaigns/{campaignId}/` - Update campaign
- ✅ PATCH `/v1/campaigns/{campaignId}/status/` - Change status
- ✅ GET `/v1/bundles/` - List bundles
- ✅ GET `/v1/bundles/{bundleId}/` - Get single bundle

### Endpoints Possibly Missing (Need Backend Work):
- ❓ GET `/v1/transparency/metrics/` - Global metrics
- ❓ GET `/v1/transparency/transfers/` - Transfer history
- ❓ GET `/v1/transparency/criteria/` - Allocation criteria
- ❓ GET `/v1/ngos/{ngoId}/transparency/` - ONG-specific transparency
- ❓ GET `/v1/donors/profile/` - Authenticated donor profile
- ❓ GET `/v1/donors/donations/` - Donor's donation history
- ❓ GET `/v1/donors/cause-preferences/` - Donor's cause preferences
- ❓ PATCH `/v1/donors/cause-preferences/` - Update preferences
- ❓ GET `/v1/ngos/{ngoId}/donors/` - NGO's donor list
- ❓ POST `/v1/ngos/{ngoId}/reports/generate/` - Export reports
- ❓ POST `/v1/ngos/{ngoId}/audit/upload/` - Upload audit

---

## Testing Checklist

After each task completion:
- [ ] No console errors
- [ ] No broken links or 404 pages
- [ ] Loading states display correctly
- [ ] Error states show meaningful messages
- [ ] Data updates when user navigates
- [ ] Responsive design still works on mobile

After all tasks:
- [ ] Full end-to-end donation flow works
- [ ] NGO can manage all campaigns
- [ ] Donor can view real donation history
- [ ] Transparency pages show real data
- [ ] Reports can be generated and downloaded
- [ ] No hardcoded mock data remains

---

## Notes

- **localStorage Usage:** Currently used for donor causes preference. Should migrate to backend after database schema is finalized.
- **Authentication:** Many features require authenticated user context from AuthContext. Ensure all API calls check `user` state.
- **Error Handling:** Replace current console.error calls with proper error boundaries and user-facing error messages.
- **Loading States:** Add skeleton loaders or spinners to prevent UI from feeling broken during data fetches.

---

## Related Files

- Backend Django Models: `backend/verification/models.py`, `backend/financial/models.py`
- Frontend Services: `frontend/src/services/` directory
- Frontend Hooks: `frontend/src/hooks/` directory
- Authentication: `frontend/src/contexts/AuthContext.jsx`
