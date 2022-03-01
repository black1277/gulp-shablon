## Простой шаблон для сборки проекта на GULP
Включает сборку:
 - шрифтов
 - картинок
 - css
 - sass
 - минификация
 - горячая перезагрузка при разработке
 - шаблоны для HTML - [PUG]
 - сборка скриптов JavaScript посредством rollup
 - скрипты поддерживают модульность (import export), классы, Promise

Примечание: в классах не поддерживаются статические поля

`npm install`

Разработка

`gulp`

Продакшен

`gulp build`

Удобно для верстки, для сборки бандлов скриптов лучше подходит [webpack5]-шаблон

[PUG]: https://github.com/pugjs/pug/tree/master/packages/pug
[webpack5]: https://github.com/black1277/webpack5-shablon