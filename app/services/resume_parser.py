import fitz
from docx import Document

def parse_pdf(file_path: str) -> str:
    document = fitz.open(file_path)
    text = ""
    for page in document:
        text += page.get_text() + "\n"
    document.close()
    return text.strip()

def parse_docx(file_path: str) -> str:
    document = Document(file_path)
    text = ""
    for paragraph in document.paragraphs:
        if paragraph.text:
            text += paragraph.text + "\n"
    return text.strip()

def parse_resume(file_path: str, file_extension: str) -> str:
    ext = file_extension.lower()
    if ext == ".pdf":
        return parse_pdf(file_path)
    elif ext == ".docx":
        return parse_docx(file_path)
    else:
        raise ValueError(f"Unsupported file type '{file_extension}'. Only PDF and DOCX files are allowed.")
