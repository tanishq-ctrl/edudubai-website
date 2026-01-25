import os

def replace_dubai_with_mena(directory):
    replacements = {
        "EduDubai": "EduMENA",
        "Edu Dubai": "Edu MENA",
        "edudubai": "edumena",
        "Dubai": "MENA",
        "dubai": "mena"
    }
    
    for root, dirs, files in os.walk(directory):
        if any(ignored in root for ignored in ['.next', 'node_modules', '.git']):
            continue
            
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.css')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for old, new in replacements.items():
                        new_content = new_content.replace(old, new)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    replace_dubai_with_mena('.')
