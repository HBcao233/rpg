import re 
import os 
import rcssmin 
import time 


def main():
  with open(f'rpg.js', 'r') as f:
    content = f.read()
    
  def minify_css(match):
    return 'css`' + rcssmin.cssmin(match.group(1)) + '`'
  
  content = re.sub(
    r'css`([^`]*?)`', 
    minify_css,
    content,
  )
  
  def minify_html(match):
    res = match.group(1).replace('\n', '')
    res = re.sub(r'>\s+<', '><', res)
    return 'html`' + res + '`'
  
  START_MARKER = '\uE000'
  END_MARKER = '\uE001'
  pattern = r'html`((?:(?!html`)[^`])*?)`'
  
  while re.search(pattern, content):
    def minify_temp(match):
      res = match.group(1).replace('\n', '')
      res = re.sub(r'>\s+<', '><', res)
      return START_MARKER + res + END_MARKER
    
    content = re.sub(pattern, minify_temp, content)
  
  content = content.replace(START_MARKER, 'html`').replace(END_MARKER, '`')
  
  content = re.sub(r'/\*[\s\S]*?\*/', '', content)
  with open(f'rpg.js', 'w') as f:
    f.write(content)


if __name__ == '__main__':
  main()
