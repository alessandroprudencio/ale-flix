import { ref } from 'vue';

export const useMedia = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchWithAuth = async (url: string, options: any = {}) => {
    const config = useRuntimeConfig();
    const { data, error: fetchError } = await useFetch(url, {
      baseURL: config.public.apiBase,
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Erro na requisição');
    }

    if (!data.value) {
      throw new Error('Dados não encontrados');
    }

    return data.value;
  };

  const fetchMedia = async (params: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      return await fetchWithAuth('/media', { params });
    } catch (err) {
      error.value = 'Erro ao carregar mídias';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const searchMedia = async (query: string, params: { page?: number; limit?: number }) => {
    loading.value = true;
    error.value = null;

    try {
      return await fetchWithAuth('/media/search', {
        params: { q: query, ...params },
      });
    } catch (err) {
      error.value = 'Erro ao buscar mídias';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const getMediaById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      return await fetchWithAuth(`/media/${id}`);
    } catch (err) {
      error.value = 'Erro ao carregar detalhes da mídia';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const getFeaturedMedia = async () => {
    loading.value = true;
    error.value = null;

    try {
      return await fetchWithAuth('/media/featured');
    } catch (err) {
      error.value = 'Erro ao carregar mídia em destaque';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const getContinueWatching = async () => {
    loading.value = true;
    error.value = null;

    try {
      return await fetchWithAuth('/media/continue-watching');
    } catch (err) {
      error.value = 'Erro ao carregar "Continuar assistindo"';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const getPopularMedia = async () => {
    loading.value = true;
    error.value = null;

    try {
      return await fetchWithAuth('/media/popular');
    } catch (err) {
      error.value = 'Erro ao carregar mídias populares';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const getNewReleases = async () => {
    loading.value = true;
    error.value = null;

    try {
      return await fetchWithAuth('/media/new-releases');
    } catch (err) {
      error.value = 'Erro ao carregar lançamentos';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchMedia,
    searchMedia,
    getMediaById,
    getFeaturedMedia,
    getContinueWatching,
    getPopularMedia,
    getNewReleases,
  };
}; 