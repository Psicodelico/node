const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('default', ()=>{
    // 使用gulp自带的文件聚集工具gulp.src查找所有的React jsx文件
    return gulp.src('app/*.jsx')
        // 开始监视源文件，为调试构建源码映射
        .pipe(sourcemaps.init())
        .pipe(babel({
            // 使用env和react配置gulp-babel
            presets:[
                '@babel/env', 
                '@babel/react']
        }))
        // 把所有源码文件拼入到一个all.js中
        .pipe(concat('all.js'))
        // 单独写入源码映射文件
        .pipe(sourcemaps.write('.'))
        // 将所有文件放到dist目录下
        .pipe(gulp.dest('dist'));

})