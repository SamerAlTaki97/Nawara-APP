# WzZzZz Release APK

هذا المسار مخصص لبناء `release APK` موقّع للاستخدام الشخصي المباشر خارج المتجر.

## المطلوب مرة واحدة فقط

1. أنشئ `keystore` ثابت.
2. خزّن قيمه داخل GitHub Actions Secrets.
3. شغّل workflow الخاص بالـ release.

## الأوامر لإنشاء keystore

نفّذ هذا الأمر على أي جهاز فيه Java:

```powershell
keytool -genkeypair -v -keystore wzzzzz-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias wzzzzz
```

بعدها حوّل الملف إلى Base64:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("wzzzzz-release.jks")) | Set-Content wzzzzz-release.base64.txt
```

## GitHub Secrets المطلوبة

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

## ماذا سيحدث

الـ workflow سيقوم بـ:

1. تنزيل الاعتمادات
2. تجهيز نسخة الموبايل
3. إنشاء مشروع Android إن لزم
4. فك الـ keystore من الـ secret
5. حقن إعدادات التوقيع تلقائياً
6. بناء `release APK`
7. رفع الملف كـ artifact جاهز للتحميل

## مهم

- احتفظ بنفس الـ keystore دائماً
- لا تغيّر `appId`
- أي تحديث مستقبلي يجب أن يُبنى بنفس المفتاح حتى يثبت فوق النسخة القديمة ويحافظ على البيانات عادةً
