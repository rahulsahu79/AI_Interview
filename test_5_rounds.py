import asyncio
from app.services.question_generator import generate_questions_for_candidate

async def main():
    profile = {
        'skills': ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'ChromaDB'],
        'experience': 'AI / Backend Developer Intern (Mobiloitte & Mavask)',
        'projects': [
            {'title': 'Banking Chatbot (RAG-Powered, FastAPI)', 'technologies': ['FastAPI', 'ChromaDB', 'LangChain']}
        ]
    }
    qs = await generate_questions_for_candidate(profile)
    print("Total rounds generated:", len(qs))
    for i, q in enumerate(qs):
        print(f"Round {i+1}: Category: '{q.get('category')}' | Title: '{q.get('title')}'")

if __name__ == '__main__':
    asyncio.run(main())
