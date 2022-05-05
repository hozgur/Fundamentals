import epaper1in54b
from machine import Pin, SPI


spi = SPI(2, baudrate=8000000, polarity=0, phase=0,sck=Pin(18), mosi=Pin(23), miso=Pin(19))
cs = Pin(33)
dc = Pin(32)
rst = Pin(21)
busy = Pin(35)

e = epaper1in54b.EPD(spi, cs, dc, rst, busy)
e.init()

w = 152
h = 152
x = 0
y = 0

# # --------------------

# # write hello world with black bg and white text
# from image_dark import hello_world_dark
# e.clear_frame_memory(b'\xFF')
# e.set_frame_memory(hello_world_dark, x, y, w, h)
# e.display_frame()

# # --------------------

# # write hello world with white bg and black text
# from image_light import hello_world_light
# e.clear_frame_memory(b'\xFF')
# e.set_frame_memory(hello_world_light, x, y, w, h)
# e.display_frame()

# --------------------

# clear display
#e.clear_frame_memory(b'\xFF')
#e.display_frame()

# use a frame buffer
# 128 * 296 / 8 = 4736 - thats a lot of pixels

import framebuf
buf1 = bytearray(w * h // 8)
buf2 = bytearray(w * h // 8)
fb1 = framebuf.FrameBuffer(buf1, w, h, framebuf.MONO_HLSB)
fb2 = framebuf.FrameBuffer(buf2, w, h, framebuf.MONO_HLSB)
black = 0
white = 1
fb1.fill(white)
fb2.fill(white)
fb1.text('Hello World35',30,10,black)

fb1.pixel(30, 10, black)
fb1.hline(30, 30, 10, black)
fb1.vline(30, 50, 10, black)

# for row in range(0,37):
# 	fb.text(str(row),0,row*8,black)
# fb.text('Line 36',0,288,black)
#e.set_frame_memory(buf, x, y, w, h)
#e.display_frame(buf1,None)

#e.draw_circle(buf1,100,100,50,black)

fb2.text('Hello World44',30,30,black)
fb1.line(30, 70, 40, 80, black)
fb1.rect(30, 90, 10, 10, white)
#e.display_frame2(buf1,buf2)
fb1.fill_rect(30, 110, 10, 10, black)
fb2.fill_rect(31, 111, 18, 18, white)
pw = 32
ph = 8
buf3 = bytearray(pw * ph // 8)
buf4 = bytearray(pw * ph // 8)
fb3 = framebuf.FrameBuffer(buf3, pw, ph, framebuf.MONO_HLSB)
fb4 = framebuf.FrameBuffer(buf3, pw, ph, framebuf.MONO_HLSB)
fb3.fill(white)
fb4.fill(black)
#fb3.text('Hello World55',30,30,black)
fb3.rect(1, 1, 16, 6, black)

e.display_partial(32,32,pw,ph,buf3,buf4)

# --------------------

# # wrap text inside a box
# import framebuf
# buf = bytearray(152 * 152 // 8)
# fb = framebuf.FrameBuffer(buf, 152, 152, framebuf.MONO_HLSB)
# black = 0
# white = 1
# # clear
# fb.fill(white)
# #e.set_frame_memory(buf, x, y, w, h)
# e.display_frame(buf,None)
# # display as much as this as fits in the box
# str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel neque in elit tristique vulputate at et dui. Maecenas nec felis lectus. Pellentesque sit amet facilisis dui. Maecenas ac arcu euismod, tempor massa quis, ultricies est.'

# # this could be useful as a new method in FrameBuffer
# def text_wrap(str,x,y,color,w,h,border=None):
# 	# optional box border
# 	if border is not None:
# 		fb.rect(x, y, w, h, border)
# 	cols = w // 8
# 	# for each row
# 	j = 0
# 	for i in range(0, len(str), cols):
# 		# draw as many chars fit on the line
# 		fb.text(str[i:i+cols], x, y + j, color)
# 		j += 8
# 		# dont overflow text outside the box
# 		if j >= h:
# 			break

# # clear
# fb.fill(white)

# # draw text box 1
# # box position and dimensions
# bx = 8
# by = 8
# bw = w - 16 # 112 = 14 cols
# bh = w - 16 # 112 = 14 rows (196 chars in total)
# text_wrap(str,bx,by,black,bw,bh,black)
# #e.set_frame_memory(buf, x, y, w, h)
# e.display_frame(buf,None)

# # draw text box 2
# bx = 0
# by = 128
# bw = w # 128 = 16 cols
# bh = 6 * 8 # 48 = 6 rows (96 chars in total)
# text_wrap(str,bx,by,black,bw,bh,black)
# #e.set_frame_memory(buf, x, y, w, h)
# e.display_frame(buf,None)

# # draw text box 3
# bx = 0
# by = 184
# bw = w//2 # 64 = 8 cols
# bh = 8 * 8 # 64 = 8 rows (64 chars in total)
# text_wrap(str,bx,by,black,bw,bh,None)
# #e.set_frame_memory(buf, x, y, w, h)
# e.display_frame(buf,None)

# # --------------------