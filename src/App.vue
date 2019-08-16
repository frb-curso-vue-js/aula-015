<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :variant="mensagem.tipo">{{mensagem.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" size="lg" v-model="usuario.nome" placeholder="Nome"></b-form-input>
			</b-form-group>
			<b-form-group label="E-mail:">
				<b-form-input type="text" size="lg" v-model="usuario.email" placeholder="E-mail"></b-form-input>
			</b-form-group>
			<hr>
			<b-button class="col-12" variant="success" size="lg" @click="salvar">{{tipo}}</b-button>

			<b-button v-if="id" class="col-12 mt-2" variant="secondary" size="lg" @click="limpar">Voltar</b-button>
		</b-card>
		<hr>
		<b-card>
			<b-button @click="obterUsuarios" class="col-12" size="lg" variant="primary">Obter usuários</b-button>
			<hr>
			<b-list-group>
				<b-list-group-item v-for="(u, id, index) in usuarios" :key="id">
					Número: {{index}}<br>
					Nome: {{u.nome}}<br>
					E-mail: {{u.email}}<br>
					Id: {{id}}<br>
					<b-button variant="warning" size="lg" class="col-12 mb-2" @click="editar(id)">Editar</b-button><br>
					<b-button variant="danger" size="lg" class="col-12" @click="deletar(id)">Deletar</b-button>
				</b-list-group-item>
			</b-list-group>
		</b-card>
	</div>
</template>

<script>


export default {
	data() {
		return {
			mensagens: [],
			id: null,
			tipo: 'Salvar',
			usuario: {
				nome: '',
				email: ''
			},
			usuarios: []
		}
	},
	created() {
/* 		this.$http.post('usuarios.json', {
			nome: 'Juca',
			email: 'Juca@gmail.com'
		}).then(res => this.resposta = res) */
		this.obterUsuarios();
	},
	methods: {
		limpar() {
			this.usuario.nome = ''
			this.usuario.email = ''
			this.id = null
			this.mensagens = []
			this.tipo = 'Salvar'
			this.obterUsuarios()
		},
		editar(id) {
			this.id = id
			this.tipo = 'Alterar'
			this.usuario = { ...this.usuarios[id] }
		},
		salvar() {
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `${this.id}.json` : '.json'
			this.$http[metodo](`usuarios/${finalUrl}`, this.usuario).then( res => {
				//console.log(res)
				this.limpar()
				this.mensagemNova('Operação realizada.', 'success')
			//this.$http.post('usuarios.json', this.usuario).then( res => {
			
			})
		},
		mensagemNova(texto, tipo) {
			this.mensagens.push({
					texto: texto,
					tipo: tipo
				})
		},
		obterUsuarios() {
			this.$http('usuarios.json').then(res => {
				//console.log(res)
				this.usuarios = res.data
				//console.log(this.usuarios)
				//this.mensagemNova('Usuários carregados.', 'success')
				})
		},
		deletar(id) {
			console.log(id)
			this.$http.delete(`usuarios/${id}.json`).then(res => {
				//console.log(res)
				this.limpar()
				this.mensagemNova('Usuário excluído.', 'warning')
			})
			.catch(() => {
				this.mensagemNova('Erro ao excluir.', 'danger')
			})
		}
	}

}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
