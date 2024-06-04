<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="search-container">
        <label for="search">Search in inputs: </label>
        <InputText
          v-model="searchText"
          placeholder="Search"
          @input="highlightFields"
          :class="{ highlight: searchHighlight }"
        />
      </div>
      <div v-for="(field, index) in fields" :key="index" class="field-group">
        <div class="input-container">
          <InputText
            v-model="field.name"
            placeholder="Name"
            @input="updateVowelCount(field, 'name')"
            :class="{ highlight: field.highlight.name }"
          />
          <span class="vowel-count">Vowels: {{ field.vowelCount.name }}</span>
        </div>
        <Button
          class="p-button-danger"
          @click.prevent="removeField(index)"
          :disabled="fields.length <= 1"
        >
          Remove
        </Button>
      </div>
      <div class="button-group">
        <Button class="p-button-success" @click.prevent="addField" :disabled="fields.length >= 10">
          Add Field
        </Button>
        <Button class="p-button-primary" type="submit">Submit</Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'

interface Field {
  name: string
  vowelCount: { name: number }
  highlight: { name: boolean }
}

export default {
  setup() {
    const fields = ref<Field[]>([createField(), createField(), createField()])
    const searchText = ref('')
    const searchHighlight = ref(false)

    function createField(): Field {
      return {
        name: '',
        vowelCount: { name: 0 },
        highlight: { name: false }
      }
    }

    const addField = () => {
      if (fields.value.length < 10) {
        fields.value.push(createField())
      }
    }

    const removeField = (index: number) => {
      fields.value.splice(index, 1)
    }

    const handleSubmit = () => {
      console.log('Form Submitted', fields.value)
    }

    const updateVowelCount = (field: Field, key: keyof Field['vowelCount']) => {
      const countVowels = (str: string): number => {
        return (str.match(/[aeiou]/gi) || []).length
      }
      field.vowelCount[key] = countVowels(field[key])
    }

    const highlightFields = () => {
      searchHighlight.value = false
      fields.value.forEach((field) => {
        field.highlight.name = field.name.includes(searchText.value)

        if (field.highlight.name) {
          searchHighlight.value = true
        }
      })
    }

    watch(searchText, highlightFields)

    return {
      fields,
      searchText,
      searchHighlight,
      addField,
      removeField,
      handleSubmit,
      updateVowelCount,
      highlightFields
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-container {
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.vowel-count {
  font-size: 14px;
  margin-left: 20px;
  color: #555;
}

.field-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 20px;
  flex-wrap: wrap;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.highlight {
  background-color: lightgreen !important;
}

@media (max-width: 600px) {
  .form-container {
    padding: 15px;
  }

  .button-group {
    flex-direction: column;
    align-items: stretch;
  }

  .button-group button {
    width: 100%;
    margin-bottom: 10px;
  }

  .button-group button:last-child {
    margin-bottom: 0;
  }
}
</style>
