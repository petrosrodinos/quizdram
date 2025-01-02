<template>
  <div class="home-container">
    <div class="home-content">
      <CreateQuiz>
        <span>
          Generate personalized quizzes with AI in seconds! Share with friends and compete for the
          top spot—fun, fast, and interactive!
        </span>
      </CreateQuiz>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  height: 92.5vh;
  margin-top: 2px;
  background: rgb(34, 193, 195);
  background: linear-gradient(70deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 61%);
  width: 100%;
}

.home-content {
  padding-top: 100px;

  span {
    font-size: 24px;
    font-weight: 400;
    margin: 20px;
    color: white;
    text-align: center;
    max-width: 750px;
  }
}
</style>
