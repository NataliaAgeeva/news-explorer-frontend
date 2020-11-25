export default function renderLoading(isLoading = false) {
  const preloader = document.querySelector('.preloader');
  if (isLoading) {
    preloader.style.display = 'flex';
    return;
  }
  preloader.style.display = 'none';
}
