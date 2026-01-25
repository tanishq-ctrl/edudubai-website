import os
import re

def refine_mena_to_dubai(directory):
    # This logic ensures we change standalone Dubai/UAE to MENA
    # but preserve the brand name EduDubai.
    
    for root, dirs, files in os.walk(directory):
        if any(ignored in root for ignored in ['.next', 'node_modules', '.git']):
            continue
            
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.css', '.env', '.local')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    
                    # 1. Change all variants of MENA brand back to Dubai brand
                    new_content = new_content.replace("EduMENA", "EduDubai")
                    new_content = new_content.replace("Edu MENA", "Edu Dubai")
                    new_content = new_content.replace("edumena", "edudubai")
                    new_content = new_content.replace("EDUMENA", "EDUDUBAI")
                    
                    # 2. Change standalone Dubai to MENA (using lookbehind to ensure not EduDubai)
                    # We use regex to find Dubai that is NOT preceded by 'Edu' or 'Edu ' or 'edu'
                    new_content = re.sub(r'(?<!Edu)(?<!Edu )(?<!edu)Dubai', 'MENA', new_content)
                    new_content = re.sub(r'(?<!Edu)(?<!Edu )(?<!edu)dubai', 'mena', new_content)
                    
                    # 3. Change UAE to MENA
                    new_content = new_content.replace("UAE", "MENA")
                    
                    # 4. Cleanup 'MENA, MENA'
                    new_content = new_content.replace("MENA, MENA", "MENA")
                    new_content = new_content.replace("MENA / MENA", "MENA")
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Refined: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    refine_mena_to_dubai('.')
