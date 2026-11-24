"""Prompt templates for resume parsing and profile analysis."""

RESUME_ANALYSIS_SYSTEM_PROMPT = """You are an expert technical interviewer and hiring committee evaluator.
Analyze the following complete resume text carefully and extract the candidate profile into valid JSON format."""

RESUME_ANALYSIS_USER_PROMPT = """Analyze the following resume text carefully and extract the candidate profile into valid JSON format.

Make sure to:
1. Extract ALL degrees found in the EDUCATION section with their college and years.
2. Extract professional experience details (job titles, internships, companies, and durations).
3. Extract high-impact projects with technologies and descriptions.
4. Detect top technical skills.

Full Resume Text:
\"\"\"{resume_text}\"\"\"

Return ONLY a JSON object with this exact structure:
{{
  "score": <float between 7.0 and 9.5 representing readiness score>,
  "readiness": <string, e.g. "Interview Ready">,
  "skills": [<string list of top 8-12 technical skills>],
  "education": [<string list of degrees, colleges, and CGPA/dates found in EDUCATION>],
  "experience": <string summarizing experience, e.g. "AI / Backend Developer Intern (Mobiloitte & Mavask)">,
  "strengths": [<list of 3 key technical strengths>],
  "improvements": [<list of 3 constructive technical areas to brush up>],
  "projects": [
    {{
      "title": <string project title>,
      "technologies": [<string list of tech used>],
      "description": <concise 1-2 sentence description>
    }}
  ]
}}"""

def build_resume_analysis_prompt(resume_text: str) -> str:
    """Build formatted prompt for resume text analysis."""
    return RESUME_ANALYSIS_USER_PROMPT.format(resume_text=resume_text)
