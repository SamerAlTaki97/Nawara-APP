# WzZzZ Release APK

هذا الملف هو المرجع الثابت لبناء نسخة `release APK` الموقعة من GitHub Actions.

## المسار الصحيح المعتمد

1. استخدم نفس `keystore` دائماً
2. استخدم نفس `appId` دائماً
3. استخدم نفس `ANDROID_KEY_ALIAS` الحقيقي الموجود داخل الـ keystore
4. شغّل workflow:
   - `Build Android Release APK`

## الإعدادات التي ثبتناها بعد التصحيح

- `Node.js` في GitHub Actions يجب أن يكون `22`
- `Java` في GitHub Actions يجب أن يكون `21`
- لا نولّد الأيقونة داخل CI
- الـ workflow يستخدم الأيقونة الجاهزة الموجودة داخل المشروع
- ملف التوقيع يفك داخل:
  - `mobile-app/android/wzzzzz-release.jks`
- لذلك `storeFile` داخل `keystore.properties` يجب أن يكون:
  - `../wzzzzz-release.jks`

## إنشاء keystore مرة واحدة فقط

نفّذ:

```powershell
keytool -genkeypair -v -keystore wzzzzz-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias wzzzzz
```

بعد الإنشاء، تحقق من الـ alias الحقيقي:

```powershell
keytool -list -v -keystore wzzzzz-release.jks
```

ثم ابحث عن:

```text
Alias name:
```

القيمة التي تظهر هنا هي نفسها التي يجب وضعها داخل:

- `ANDROID_KEY_ALIAS`

## أفضل طريقة لتوليد Base64 بدون أخطاء

استخدم هذا الأمر:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("wzzzzz-release.jks")) | Set-Clipboard
```

ثم الصق القيمة مباشرة في GitHub Secret:

- `ANDROID_KEYSTORE_BASE64`

لا تستخدم نسخة ناقصة أو ملف منسق يدوياً.

## GitHub Secrets المطلوبة

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

## خطوات البناء

1. ارفع التعديلات إلى GitHub
2. افتح `Actions`
3. افتح `Build Android Release APK`
4. اضغط `Run workflow`
5. بعد النجاح نزّل:
   - `WzZzZ-release-apk`

## عند التحديث لاحقاً

نفّذ فقط:

1. عدّل ملفات المشروع
2. ارفع التعديلات إلى GitHub
3. شغّل نفس workflow
4. نزّل الـ APK الجديد
5. ثبّته فوق النسخة القديمة

## لا تغيّر هذه الأشياء

- لا تغيّر `keystore`
- لا تغيّر `ANDROID_KEY_ALIAS`
- لا تغيّر `appId`

## مشاكل وقعنا فيها وتم حلها

- فشل `Generate app icon` على GitHub Linux
  - الحل: حذف توليد الأيقونة من CI والاكتفاء بالأيقونة الجاهزة

- فشل Capacitor بسبب Node قديم
  - الحل: `node-version: 22`

- فشل Java compilation بسبب Java قديم
  - الحل: `java-version: 21`

- فشل Base64
  - الحل: نسخ القيمة مباشرة بـ `Set-Clipboard`

- فشل signing بسبب alias خاطئ
  - الحل: قراءة alias الحقيقي من `keytool -list -v -keystore ...`

- فشل signing بسبب مسار ملف keystore
  - الحل: `storeFile=../wzzzzz-release.jks`
