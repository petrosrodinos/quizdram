<script lang="ts" setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { generateQuiz } from "../../../services/quiz";

// const { mutate } = useMutation({
//   mutationFn: (newTodo: any) => generateQuiz(newTodo),
//   onSuccess: async (res: any) => {
//     console.log(res);
//   },
// });

const { quizSettings } = defineProps<{
  quizSettings: any;
}>();

const { isLoading, data, error } = useQuery({
  queryKey: ["new-quiz"],
  queryFn: () => generateQuiz(quizSettings),
});
</script>

<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <p v-else-if="data">Quiz generated successfully</p>
  </div>
</template>
