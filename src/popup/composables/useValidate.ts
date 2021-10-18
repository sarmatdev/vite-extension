import {computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import {useStore} from 'vuex'
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

    return {
      cpV$,
      passwordErrors,
      repeatPasswordErrors,
      lV$,
      unLockErrors

    }
}