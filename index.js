class RecordManager {
   constructor() {
      this.records = [];
      this.loadFromLocalStorage();
   }

   generateId(len) {
      let i = 0
      if(i < len) {
         i++;
      }
      return i;
   }

   addRecord(title, description) {
      const record = {
         id: this.generateId(this.records.length),
         title,
         description,
         createdAt: new Date().getTime(),
         updatedAt: new Date().getTime(),
         done: false,
      };

      this.records.push(record);
      this.saveToLocalStorage();

      return record;
   }

   deleteRecord(id) {
      const index = this.records.findIndex(record => record.id === id);

      if (index !== -1) {
         this.records.splice(index, 1);
         this.saveToLocalStorage();
      }
   }

   getRecords() {
      return this.records;
   }

   getRecord(id) {
      return this.records.find(record => record.id === id);
   }

   updateRecord(id, updates) {
      const record = this.getRecord(id);

      if (!record) {
         return;
      }

      for (const key in updates) {
         record[key] = updates[key];
      }

      record.updatedAt = new Date().getTime();
      this.saveToLocalStorage();

      return record;
   }

   saveToLocalStorage() {
      localStorage.setItem('records', JSON.stringify(this.records));
   }

   loadFromLocalStorage() {
      const records = localStorage.getItem('records');

      if (records) {
         this.records = JSON.parse(records);
      }
   }
}

const recordManager = new RecordManager(),
      record = recordManager.addRecord('Новая запись', 'Описание новой записи'),
      getRecords = recordManager.getRecords(),
      getOneRecs = recordManager.getRecord(1);

console.log("Получение новой записи:", record);
console.log("Получение всех записей", getRecords);
console.log("Получение одной записи", getOneRecs);
record.done = true;
recordManager.updateRecord(1, record);
console.log("Получение обновленной записи:", getOneRecs);
recordManager.deleteRecord(1);
console.log("Получение всех записей для проверки", getRecords);