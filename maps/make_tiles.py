import os, time, random
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from scipy import ndimage

def create_tile(seed, img, x, y, size, path, level, max_level):
    # Create directory for this tile
    tile_path = os.path.join(path, f'level_{level}_x_{x}_y_{y}')
    os.makedirs(tile_path, exist_ok=True)

    # Crop the image to this tile and zoom
    tile_img = img.crop((x, y, x + size, y + size))
    tile_img = tile_img.resize((300, 300), Image.NEAREST)

    # Add more noise
    np.random.seed(seed + x + y + level)
    noise = np.random.normal(0, 25, (300, 300, 3))
    noise_img = Image.fromarray((np.array(tile_img) + noise).clip(0, 255).astype(np.uint8))

    # Save the image
    tile_image_path = os.path.join(tile_path, f'level_{level}_x_{x}_y_{y}.jpg')
    noise_img.save(tile_image_path)

    # Display every image (change condition to toggle this functionality)
    if random.random() < 0.25: 
        img=mpimg.imread(tile_image_path)
        plt.figure()
        plt.imshow(img)
        plt.title(f'level_{level}_x_{x}_y_{y}')
        plt.axis('off')
        plt.draw()
        plt.pause(3)
        plt.close()

    if level < max_level:
        for i in range(5):
            for j in range(5):
                create_tile(seed, noise_img, i*size//5, j*size//5, size//5, tile_path, level+1, max_level)

def gen_tiles(seed, img_path, max_level):
    img = Image.open(img_path)
    top_dir = f'tiles_{seed}'
    os.makedirs(top_dir, exist_ok=True)
    plt.ion()

    for i in range(5):
        for j in range(5):
            create_tile(seed, img, i*img.width//5, j*img.height//5, img.width//5, top_dir, 1, max_level)

# Generate one level of resolution
gen_tiles(12345, 'viking1200.jpg', 1)

