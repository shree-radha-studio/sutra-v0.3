import sys, os
from PIL import Image, ImageChops
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
for f in sorted(os.listdir(src)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(src, f)).convert('RGB')
    bg = Image.new('RGB', im.size, im.getpixel((2, im.size[1]-2)))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda p: 255 if p > 18 else 0)
    box = diff.getbbox()
    if box:
        pad = 6
        box = (max(0, box[0]-pad), max(0, box[1]-pad), min(im.size[0], box[2]+pad), min(im.size[1], box[3]+pad))
        im = im.crop(box)
    out = os.path.join(dst, f[:-4] + '.jpg')
    im.save(out, 'JPEG', quality=86, optimize=True, progressive=True)
    print(f"{f} → {im.size[0]}x{im.size[1]} {os.path.getsize(out)//1024} KB")
