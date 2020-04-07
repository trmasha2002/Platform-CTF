CTF Platform Project
===================

### Стек технологий
#### Backend
- Python
- Flask (+addons)

#### Frontend

- ReactJS
- HTML + CSS
- Bootstrap 4
- JQuery


### Инструкция по запуску

1. Убедитесь, что на вашей локальной машине установлены nodejs и пакетные менеджеы npm и pip (Ссылки на подробную инструкцию по установке npm и pip:
<br> https://nodejs.org/en/download/package-manager/
https://pip.pypa.io/en/stable/installing/)
2. Перейдите в корень проекта и выполните команду `pip install -r requirements.txt`
3. Перейдите в папку /cople/app/static и выполните команды: <br>  `npm i` 
4. В папке /cople/app/static/node_modules/config заменить содержимое файла paths.js на это https://goo.gl/7m8EBg 
5. В папке /cople/app/static выполинть команду `npm start` 
5. В корне проекта выполнить команды: <br>`python migrate.py` <br> `python runner.py`
6. Откройте приложение в браузере по адресу http://127.0.0.1:3000
