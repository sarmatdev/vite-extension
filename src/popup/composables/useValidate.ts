import { computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useStore } from 'vuex'
import { required, minLength, sameAs } from '@vuelidate/validators'

export default function useValidate(state: any) {
  const createPasswordRules = computed(() => {
    const localRules = {
      password: { required, minLength: minLength(8) },
      repeatPassword: {
        required,
        sameAs: sameAs(state.password)
      }
    }

    return localRules
  })

  const cpV$: any = useVuelidate(createPasswordRules, state)
  const passwordErrors = computed(() => {
    const errors = []
    if (cpV$.value.password.$dirty) {
      if (!cpV$.value.password.required.$response) {
        errors.push('This filed is required')
      } else if (!cpV$.value.password.minLength.$response) {
        errors.push('Min length 8 characters')
      }
    }
    return errors
  })

  const repeatPasswordErrors = computed(() => {
    const errors = []
    if (cpV$.value.repeatPassword.$dirty) {
      if (!cpV$.value.repeatPassword.required.$response) {
        errors.push('This filed is required')
      } else if (!cpV$.value.repeatPassword.sameAs.$response) {
        errors.push('Password mismatch')
      }
    }
    return errors
  })

  const store = useStore()
  const originPassword = computed(() => store.getters['settings/password'])
  const lockRules = computed(() => {
    const localRules = {
      password: {
        required,
        sameAs: sameAs(originPassword.value)
      }
    }

    return localRules
  })
  const lV$: any = useVuelidate(lockRules, state)
  const unLockErrors = computed(() => {
    const errors = []
    if (lV$.value.password.$dirty) {
      if (!lV$.value.password.required.$response) {
        errors.push('This filed is required')
      } else if (!lV$.value.password.sameAs.$response) {
        errors.push('Wrong password')
      }
    }
    return errors
  })

  const confirmMnemonicRules = computed(() => {
    const localRules = {
      mnemonicForConfirm: {
        required,
        sameAs: sameAs(state.mnemonic)
      }
    }

    return localRules
  })
  const CMV$: any = useVuelidate(confirmMnemonicRules, state)
  const confrimMnemonicErrors = computed(() => {
    const errors = []
    if (CMV$.value.mnemonicForConfirm.$dirty) {
      if (!CMV$.value.mnemonicForConfirm.required.$response) {
        errors.push('This filed is required')
      } else if (!CMV$.value.mnemonicForConfirm.sameAs.$response) {
        errors.push('Incorrect words or words order')
      }
    }
    return errors
  })

  const requiedRule = computed(() => {
    const localRules = {
      validator: {
        required
      }
    }

    return localRules
  })
  const requiedV$: any = useVuelidate(requiedRule, state)
  const requiedError = computed(() => {
    const errors = []
    if (requiedV$.value.validator.$dirty) {
      if (!requiedV$.value.validator.required.$response) {
        errors.push('This filed is required')
      }
    }
    return errors
  })

  const importTextareaRule = computed(() => {
    const localRules = {
      validator: {
        required
      }
    }

    return localRules
  })
  const importTextareaV$: any = useVuelidate(importTextareaRule, state)
  const importTextareaError = computed(() => {
    const errors = []
    if (importTextareaV$.value.validator.$dirty) {
      if (!importTextareaV$.value.validator.required.$response) {
        errors.push('This filed is required')
      }
    }
    return errors
  })

  return {
    cpV$,
    passwordErrors,
    repeatPasswordErrors,
    lV$,
    unLockErrors,
    CMV$,
    confrimMnemonicErrors,
    requiedV$,
    requiedError,
    importTextareaV$,
    importTextareaError
  }
}
