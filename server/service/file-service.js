const fs = require('fs');
const path = require('path');
const { nanoid } = require("nanoid");

class FileService {
    saveFiles(files) {
        return files.map((file) => {
            const fileName = nanoid() + '.jpg';
            const newPath = path.resolve(__dirname, '../public', fileName);
            fs.writeFileSync(newPath, file.buffer);
            return fileName
        })
    }

    deleteFiles(files) {
        files.forEach((file) => {
            const pathToFile = path.resolve(__dirname, '../public', file)
            if (!fs.existsSync(pathToFile)) return;
            setTimeout(() => {
                fs.unlinkSync(pathToFile);
            }, 1000)
        })
    }
}

module.exports = new FileService();
