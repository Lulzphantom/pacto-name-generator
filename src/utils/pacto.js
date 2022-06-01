import html2canvas from 'html2canvas';

export const getPactoName = (name) => {
    const nameArray = name.split('');
    return nameArray;
}

export const getCharColorByIndex = (index, length) => {
    const module = (index + 1) % 5;
    return module || 5;
}

export const exportToPng = async (dom) => {
    const canvas = await html2canvas(dom);
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const a = document.createElement('a');
    a.setAttribute('download', `pacto.png`);
    a.setAttribute('href', image);
    a.click();
    a.remove();
}