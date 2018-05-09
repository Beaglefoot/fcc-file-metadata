{
  const fileButton = document.getElementsByClassName('file-button')[0];
  const input = fileButton.getElementsByTagName('input')[0];
  const form = fileButton.parentNode;

  input.onchange = ({ target: { files } }) => {
    const fileName = files[0].name;
    const fileNameClass = 'file-name';

    let fileNameElement = form.getElementsByClassName(fileNameClass)[0];

    if (!fileNameElement) {
      fileNameElement = document.createElement('div');
      fileNameElement.classList.add(fileNameClass);
      form.appendChild(fileNameElement);
    }

    fileNameElement.textContent = fileName;
  };
}
