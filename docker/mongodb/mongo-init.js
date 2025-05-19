db = db.getSiblingDB('myapp'); // 선택한 DB

db.createCollection('members'); // 컬렉션 생성

// 사용자 생성
db.createUser({
  user: 'eventAdmin',
  pwd: 'qwer1234',
  roles: [
    {
      role: 'readWrite',
      db: 'myapp'
    },
    { role: "dbAdmin", db: "myapp" }
  ]
});
// 초기 컬렉션 및 예시 데이터 생성
db.members.insertOne({
  email: 'admin@example.com',
  name: 'Admin User',
  roles: ['admin', 'manager'],
  createdAt: new Date(),
});
