# Farm-tner MVP Landing Page

순수 HTML/CSS/JS로 만든 MVP 랜딩페이지입니다.

## 로컬 실행

`index.html`을 더블클릭해서 브라우저로 열면 됩니다.

## GitHub에 업로드 (Git 설치 없이)

1. GitHub에서 새 리포지토리를 만듭니다. (예: `farm-tner-landing`)
2. 리포지토리 페이지에서 **Add file → Upload files**로 아래 파일들을 업로드합니다.
   - `index.html`
   - `style.css`
   - `script.js`
   - `.gitignore`
   - `vercel.json`
3. Commit하면 GitHub에 코드가 올라갑니다.

## Vercel 자동 배포 연결

1. Vercel 대시보드에서 **Add New → Project**
2. **Import Git Repository**에서 위 GitHub 리포지토리를 선택
3. Framework Preset은 **Other**(또는 자동 감지)로 두고,
   Build Command는 비워두거나 `None`,
   Output Directory 설정 없이 기본값으로 진행합니다.
4. Deploy 후부터는 GitHub에 push/commit할 때마다 자동으로 재배포됩니다.

## 참고

- `vercel.json`은 정적 사이트로 동작할 때 URL 정리(확장자 숨김 등) 용도로 포함되어 있습니다.
