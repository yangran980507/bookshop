<template>
  <div>
    <div>
      <img alt="加载失败" style="width: 200px; height: 140px"
           src="../../assets/tips1.jpg"/>
    </div>
    <ul>
      <li class="liStates">书号：图书的ISBN，请务必输入正确，此项不能修改。</li>
      <li class="liStates">发行日期：请输入该书首次发行的日期，如2005年10月。</li>
      <li class="liStates">封面文件：请先将图书的封面文件保存到站点的static/img文件夹下，再输入文件名即可，包括扩展名，如：JSPxxxtkfaljx.jpg。</li>
      <li class="liStates">是否推荐：选择“是”该图书信息将显示在网站的首页中。</li>
      <li class="liStates">是否新书：选择“是”该图书信息将显示在“新书上架”中。</li>
    </ul>
  </div>
</template>
<style>
.liStates {
  text-align: left;
}
</style>
