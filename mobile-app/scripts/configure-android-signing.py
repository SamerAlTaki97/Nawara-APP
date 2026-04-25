import re
from pathlib import Path


BUILD_GRADLE = Path("android/app/build.gradle")

SIGNING_SNIPPET = """
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

"""

SIGNING_CONFIG_BLOCK = """
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
"""


def main() -> None:
    text = BUILD_GRADLE.read_text(encoding="utf-8")

    if "def keystorePropertiesFile = rootProject.file(\"keystore.properties\")" not in text:
        text = SIGNING_SNIPPET + text

    if "signingConfigs {" not in text:
        marker = "android {"
        text = text.replace(marker, marker + "\n" + SIGNING_CONFIG_BLOCK, 1)

    release_marker = "buildTypes {"
    signing_line = "            signingConfig signingConfigs.release"
    if signing_line not in text and release_marker in text:
        text = re.sub(
            r"(buildTypes\s*\{\s*release\s*\{)",
            r"\1\n" + signing_line,
            text,
            count=1,
        )

    BUILD_GRADLE.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
