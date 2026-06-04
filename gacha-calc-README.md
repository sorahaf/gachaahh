# 🎰 Gacha Value Calculator

เว็บคำนวณความคุ้มค่ากาชา แชร์ลิงก์ในดิสคอร์ดได้เลย

## วิธี Deploy บน GitHub Pages (ฟรี)

1. **สร้าง GitHub account** ถ้ายังไม่มี → https://github.com
2. **สร้าง Repository ใหม่**
   - กด `+` → `New repository`
   - ตั้งชื่อ เช่น `gacha-calc`
   - เลือก **Public**
   - กด `Create repository`
3. **อัปโหลดไฟล์**
   - กด `uploading an existing file`
   - ลาก `index.html` ใส่
   - กด `Commit changes`
4. **เปิด GitHub Pages**
   - ไปที่ `Settings` → `Pages`
   - Source: `Deploy from a branch`
   - Branch: `main` / `(root)`
   - กด `Save`
5. **รอ 1-2 นาที** แล้วได้ลิงก์  
   `https://ชื่อuser.github.io/gacha-calc/`

แชร์ลิงก์นี้ในดิสคอร์ดได้เลย! ทุกคนเปิดได้จากมือถือและ PC

## วิธีอัปเดตค่าเมื่อมีแพทช์ใหม่

- แก้ค่าตรงกล่องสีบน index.html ได้เลย (บรรทัด `value="..."`)
- หรือให้คนในกลุ่มแก้เองบนหน้าเว็บก็ได้ (ค่าไม่ได้บันทึก reset ทุกครั้งที่โหลด)
