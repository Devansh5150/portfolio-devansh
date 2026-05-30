from rembg import remove
from PIL import Image

input_paths = [
    'public/devansh-original.png',
    'public/devansh-vision-pro.png'
]

for path in input_paths:
    print(f"Removing background from {path}...")
    try:
        input_image = Image.open(path)
        output_image = remove(input_image)
        output_image.save(path)
        print(f"Successfully updated {path}")
    except Exception as e:
        print(f"Failed to process {path}: {e}")
