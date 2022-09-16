import glob
import yaml
import os
try:
    from yaml import Cloader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

cdir = os.path.dirname(__file__)
filepath = os.path.join(cdir, 'yaml', '*.yaml')
print(__file__)
print(cdir)
print(filepath)
files = set(glob.glob(filepath))
for file in files:
    print(file)
    basename = os.path.basename(file)
    filename = os.path.splitext(basename)[0]
    with open(file) as f:
        obj = yaml.load(f, Loader)
        with open(os.path.join(cdir, 'text', filename + '.txt'), "w") as txt_file:
            for line in obj['payload']:
                txt_file.write(''.join(line) + '\n')
exit()
